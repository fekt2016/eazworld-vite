import React from "react";
import styled from "styled-components";
import { getParentName } from "../../../utils/helpers";
import useGetImmediateSubcategories from "../../../hooks/useGetImmediateSubcategories";
import { useGetSubCategoryCount } from "../../../hooks/useGetSubCategoryCount";

const CategoryTree = function ({
  categories,
  categoriesTree,
  parentCategory = null,
  setShowForm,
  level,
  setFilters,
  setImagePreview,
  setEditingCategory,
  setFormData,
  onUpdateCategory,
  onDeleteCategory,
  productCountByCategory,
}) {
  const productCounts = productCountByCategory?.data?.productCounts || {};

  const getImmediateSubcategories = useGetImmediateSubcategories(categories);
  const getSubCategoryCount = useGetSubCategoryCount(categories);

  const parentCate = categoriesTree
    .filter((cat) => cat.parentCategory === parentCategory)
    .sort((a, b) => a.name.localeCompare(b.name));

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

  const handleToggleStatus = (category) => {
    const newStatus = category.status === "Active" ? "Inactive" : "Active";
    onUpdateCategory({
      id: category._id,
      formData: { status: newStatus },
    });
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      onDeleteCategory(categoryId);
    }
  };

  if (parentCate.length === 0 && parentCategory === null) {
    return (
      <EmptyState>
        <EmptyIcon>📁</EmptyIcon>
        <EmptyTitle>No Categories Found</EmptyTitle>
        <EmptyText>
          Try adjusting your filters or create a new category
        </EmptyText>
        <AddButton onClick={() => setShowForm(true)}>
          + Add New Category
        </AddButton>
      </EmptyState>
    );
  }

  return parentCate.map((category) => {
    const counts = productCounts.find(
      (item) => item.parentCategory === category.name
    );
    console.log("count", counts);
    const subCount = getSubCategoryCount(category._id);
    const hasChildren = subCount > 0;
    const subcategories = getImmediateSubcategories(category._id);

    return (
      <React.Fragment key={category._id}>
        <CategoryCard level={level}>
          <CategoryImageContainer>
            {category.image ? (
              <>
                <CategoryImage src={category.image} alt={category.name} />
                <ImagePlaceholder
                  className="image-error"
                  style={{ display: "none" }}
                >
                  Failed to load image
                </ImagePlaceholder>
              </>
            ) : (
              <ImagePlaceholder>No image available</ImagePlaceholder>
            )}
          </CategoryImageContainer>
          <CategoryContent>
            <CategoryHeader>
              <CategoryName>{category.name}</CategoryName>
              <StatusBadge $status={category.status}>
                {category.status}
              </StatusBadge>
            </CategoryHeader>
            <CategoryDescription>{category.description}</CategoryDescription>
            <CategoryMeta>
              <MetaItem>
                <MetaLabel>Products:</MetaLabel>
                <MetaValue>{counts?.count || 0}</MetaValue>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Sub-categories:</MetaLabel>
                <MetaValue>{subCount}</MetaValue>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Parent:</MetaLabel>
                <MetaValue>{getParentName(category._id, categories)}</MetaValue>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Created:</MetaLabel>
                <MetaValue>{category.createdAt}</MetaValue>
              </MetaItem>
            </CategoryMeta>
            {hasChildren && (
              <SubcategorySection>
                <SubcategoryLabel>Subcategories:</SubcategoryLabel>
                <SubcategoryList>
                  {subcategories.map((sub) => (
                    <SubcategoryItem
                      key={sub._id}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          parentFilter: sub._id,
                        }))
                      }
                    >
                      {sub.name}
                    </SubcategoryItem>
                  ))}
                </SubcategoryList>
              </SubcategorySection>
            )}
            <CategoryActions>
              <ActionButton onClick={() => handleEdit(category)}>
                Edit
              </ActionButton>
              <ActionButton
                $status={category.status}
                onClick={() => handleToggleStatus(category)}
              >
                {category.status === "Active" ? "Deactivate" : "Activate"}
              </ActionButton>
              <DeleteButton onClick={() => handleDelete(category._id)}>
                Delete
              </DeleteButton>
              {hasChildren && (
                <ViewSubButton
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      parentFilter: category._id,
                    }))
                  }
                >
                  View All Sub-categories
                </ViewSubButton>
              )}
            </CategoryActions>
          </CategoryContent>
        </CategoryCard>
      </React.Fragment>
    );
  });
};

export default CategoryTree;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1565c0;
  }
`;

const ActionButton = styled.button`
  background: #f5f5f5;
  color: ${({ $status }) => ($status === "Active" ? "#1976d2" : "#757575")};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e3e3e3;
  }
`;

const DeleteButton = styled.button`
  background: #ffeaea;
  color: #d32f2f;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #ffd6d6;
  }
`;

const ViewSubButton = styled.button`
  background: #f0f4ff;
  color: #2a4dff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-top: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #dbeafe;
  }
`;

const CategoryActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const SubcategorySection = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #e3e3e3;
`;

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SubcategoryItem = styled.li`
  background: #f5f5f5;
  color: #1976d2;
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
  &:hover {
    background: #e3eafe;
  }
`;

const SubcategoryLabel = styled.span`
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const MetaValue = styled.span`
  font-weight: 500;
  color: #333;
`;

const MetaLabel = styled.span`
  font-weight: 400;
  color: #888;
  margin-right: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CategoryMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const CategoryName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
`;

const CategoryDescription = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.75rem;
`;

const CategoryCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
  margin-bottom: 2rem;
  margin-left: ${({ level }) => level * 2}rem;
  transition: box-shadow 0.2s;
  border-left: 4px solid #1976d2;
  position: relative;
  display: flex;
  gap: 1.5rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25em 0.75em;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  background: ${({ $status }) =>
    $status === "Active" ? "#e3fcec" : "#ffeaea"};
  color: ${({ $status }) => ($status === "Active" ? "#388e3c" : "#d32f2f")};
  margin-left: 0.75rem;
`;

const CategoryImageContainer = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};

  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
`;

const CategoryContent = styled.div`
  flex: 1;
`;
