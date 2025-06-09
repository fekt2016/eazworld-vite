import { useState } from "react";
import { compressImage } from "../../utils/imageCompressor";
import styled from "styled-components";
import useCategory from "../../hooks/category/useCategory";
import CategoryTree from "../components/category/CategoryTree";
import HeaderSection from "../components/category/ HeaderSection";
import CategoryForm from "../components/category/CategoryForm";
import Breadcrumb from "../components/category/Breadcrumb";
import CategoryListView from "../components/category/CategoryListView";
import EmptyState from "../components/category/EmptyState";
import useProduct from "../../hooks/product/useProduct";

const CategoryManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "ALL",
    search: "",
    viewMode: "tree",
    parentFilter: "ALL",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    parentCategory: null,
  });

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: value }));
  // };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { getCategories, updateCategory, createCategory, deleteCategory } =
    useCategory();
  const { getProductCountByCategory } = useProduct();
  const { data: productCountByCategory } = getProductCountByCategory;
  console.log("productCountByCategory", productCountByCategory);

  // Add handleDelete function
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory.mutate(categoryId);
    }
  };

  const handleUpdateCategory = ({ id, formData }) => {
    updateCategory.mutate({ id, formData });
  };

  const { data, isLoading: isGettingCategories } = getCategories;
  const { results = [] } = data || {};

  const categories = results || [];

  // Get top-level categories
  const topLevelCategories = categories
    .filter((cat) => cat.parentCategory === null)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter categories based on filters
  const filteredCategories = categories.filter((cat) => {
    if (filters.status !== "ALL" && cat.status !== filters.status) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !cat.name.toLowerCase().includes(searchLower) &&
        !(
          cat.description && cat.description.toLowerCase().includes(searchLower)
        )
      ) {
        return false;
      }
    }

    if (filters.parentFilter !== "ALL") {
      if (filters.parentFilter === "TOP_LEVEL") {
        if (cat.parentCategory !== null) return false;
      } else {
        if (cat.parentCategory !== filters.parentFilter) return false;
      }
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
    setImagePreview(category.image);

    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      parentCategory: category.parentCategory,
      image: category.image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image" && formData[key]) {
        form.append(key, formData[key]);
      }
    });

    if (formData.image && formData.image instanceof Blob) {
      const compressedImage = await compressImage(formData.image);
      form.append("image", compressedImage, formData.image.name);
    }

    if (editingCategory) {
      updateCategory.mutate(
        {
          id: editingCategory._id,
          formData: form,
        },
        {
          onSuccess: () => resetForm(),
        }
      );
    } else {
      createCategory.mutate(form, {
        onSuccess: () => resetForm(),
      });
    }
  };

  // Reset form function
  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      status: "Active",
      parentCategory: null,
      image: null,
    });
    setImagePreview(null);
    setFormErrors({});
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      status: "Active",
      parentCategory: null,
    });
    setFormErrors({});
  };

  if (isGettingCategories) return <div>...Loading</div>;

  return (
    <Container>
      <HeaderSection
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
        topLevelCategories={topLevelCategories}
        setShowForm={setShowForm}
      />
      <CategoryForm
        showForm={showForm}
        editingCategory={editingCategory}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        formErrors={formErrors}
        setFormData={setFormData}
        imagePreview={imagePreview}
        topLevelCategories={topLevelCategories}
        setImagePreview={setImagePreview}
        cancelForm={cancelForm}
      />

      <Breadcrumb
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
      {filters.viewMode === "tree" ? (
        <CategoriesTree>
          <CategoryTree
            categoriesTree={filteredCategories}
            categories={categories}
            setShowForm={setShowForm}
            setFilters={setFilters}
            setImagePreview={setImagePreview}
            setEditingCategory={setEditingCategory}
            setFormData={setFormData}
            level={0}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDelete}
            productCountByCategory={productCountByCategory}
          />
        </CategoriesTree>
      ) : currentCategories.length > 0 ? (
        <CategoryListView
          currentCategories={currentCategories}
          categories={categories}
          setFilters={setFilters}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          updateCategory={updateCategory}
        />
      ) : (
        <EmptyState />
      )}
      {filters.viewMode === "list" &&
        filteredCategories.length > itemsPerPage && (
          <Pagination>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </PaginationButton>

            <PageInfo>
              Page {currentPage} of {totalPages}
            </PageInfo>

            <PaginationButton
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </PaginationButton>
          </Pagination>
        )}
    </Container>
  );
};
export default CategoryManagement;

// // Styled Components (unchanged from your original styles)
const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const CategoriesTree = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const PageInfo = styled.span`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
`;
