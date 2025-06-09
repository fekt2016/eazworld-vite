// src/pages/SellerDiscountPage.js
import { useState } from "react";
import styled from "styled-components";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaTrash,
  FaEdit,
  FaTag,
  FaCalendarAlt,
  FaPercentage,
  FaDollarSign,
} from "react-icons/fa";

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  padding: 10px 16px;
  background-color: ${(props) =>
    props.variant === "outline" ? "transparent" : "#3b82f6"};
  color: ${(props) => (props.variant === "outline" ? "#3b82f6" : "white")};
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  border: ${(props) =>
    props.variant === "outline" ? "1px solid #3b82f6" : "none"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${(props) =>
      props.variant === "outline" ? "#dbeafe" : "#2563eb"};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #9ca3af;
    background-color: #f9fafb;
  }
`;

const StatusFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatusButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  background-color: ${({ active }) => (active ? "#dbeafe" : "#f3f4f6")};
  color: ${({ active }) => (active ? "#1d4ed8" : "#4b5563")};

  &:hover {
    background-color: #e5e7eb;
  }
`;

const DiscountsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 24px;
`;

const DiscountItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr auto;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name value"
      "dates status"
      "usage actions";
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const DiscountName = styled.div`
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 1024px) {
    grid-area: name;
  }
`;

const DiscountCode = styled.div`
  color: #3b82f6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    grid-area: name;
    justify-self: end;
  }
`;

const DiscountValue = styled.div`
  font-weight: 600;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    grid-area: value;
  }
`;

const DiscountDates = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    grid-area: dates;
  }
`;

const DiscountStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;

  ${({ active }) =>
    active
      ? `background-color: #d1fae5; color: #065f46;`
      : `background-color: #fee2e2; color: #b91c1c;`}

  @media (max-width: 1024px) {
    grid-area: status;
    justify-self: end;
  }
`;

const DiscountUsage = styled.div`
  color: #6b7280;
  font-size: 0.875rem;

  @media (max-width: 1024px) {
    grid-area: usage;
  }
`;

const DiscountActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    grid-area: actions;
    justify-self: end;
  }
`;

const ActionButton = styled.button`
  padding: 8px;
  border-radius: 6px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

const CreateDiscountPanel = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-top: 24px;
`;

const PanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

// Mock data
const mockDiscounts = [
  {
    id: "DSC-001",
    name: "Summer Sale",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    active: true,
    usage: 42,
    maxUsage: 100,
  },
  {
    id: "DSC-002",
    name: "New Customer Discount",
    code: "WELCOME10",
    type: "fixed",
    value: 10,
    startDate: "2023-05-15",
    endDate: "2023-12-31",
    active: true,
    usage: 18,
    maxUsage: 50,
  },
  {
    id: "DSC-003",
    name: "Clearance Event",
    code: "CLEARANCE30",
    type: "percentage",
    value: 30,
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    active: false,
    usage: 87,
    maxUsage: 100,
  },
  {
    id: "DSC-004",
    name: "Flash Sale",
    code: "FLASH50",
    type: "percentage",
    value: 50,
    startDate: "2023-07-01",
    endDate: "2023-07-01",
    active: true,
    usage: 12,
    maxUsage: 20,
  },
];

const statusOptions = [
  { id: "all", label: "All Discounts" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  { id: "upcoming", label: "Upcoming" },
  { id: "expired", label: "Expired" },
];

const SellerDiscountPage = () => {
  const [discounts] = useState(mockDiscounts);
  const [filteredDiscounts, setFilteredDiscounts] = useState(mockDiscounts);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New discount form state
  const [newDiscount, setNewDiscount] = useState({
    name: "",
    code: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    maxUsage: "",
    active: true,
  });

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredDiscounts(discounts);
    } else {
      const filtered = discounts.filter(
        (discount) =>
          discount.name.toLowerCase().includes(term.toLowerCase()) ||
          discount.code.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDiscounts(filtered);
    }
  };

  // Filter by status
  const filterByStatus = (status) => {
    setActiveStatus(status);

    if (status === "all") {
      setFilteredDiscounts(discounts);
    } else if (status === "active") {
      const filtered = discounts.filter((discount) => discount.active);
      setFilteredDiscounts(filtered);
    } else if (status === "inactive") {
      const filtered = discounts.filter((discount) => !discount.active);
      setFilteredDiscounts(filtered);
    } else if (status === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      const filtered = discounts.filter(
        (discount) => discount.startDate > today
      );
      setFilteredDiscounts(filtered);
    } else if (status === "expired") {
      const today = new Date().toISOString().split("T")[0];
      const filtered = discounts.filter((discount) => discount.endDate < today);
      setFilteredDiscounts(filtered);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDiscount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Discount created: ${newDiscount.name} (${newDiscount.code})`);
    setNewDiscount({
      name: "",
      code: "",
      type: "percentage",
      value: "",
      startDate: "",
      endDate: "",
      maxUsage: "",
      active: true,
    });
    setShowCreateForm(false);
  };

  // Delete discount
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      alert(`Discount ${id} deleted`);
    }
  };

  return (
    <DashboardContainer>
      <ContentContainer>
        <Title>
          <span>Discount Management</span>
          <HeaderActions>
            <PrimaryButton onClick={() => setShowCreateForm(!showCreateForm)}>
              <FaPlus /> {showCreateForm ? "Cancel" : "Create Discount"}
            </PrimaryButton>
          </HeaderActions>
        </Title>

        <ControlsContainer>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search discounts by name or code..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>

          <FilterButton>
            <FaFilter /> Filters
          </FilterButton>

          <StatusFilter>
            {statusOptions.map((status) => (
              <StatusButton
                key={status.id}
                active={activeStatus === status.id}
                onClick={() => filterByStatus(status.id)}
              >
                {status.label}
              </StatusButton>
            ))}
          </StatusFilter>
        </ControlsContainer>

        <DiscountsContainer>
          {filteredDiscounts.length > 0 ? (
            filteredDiscounts.map((discount) => (
              <DiscountItem key={discount.id}>
                <DiscountName>
                  <div>{discount.name}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    ID: {discount.id}
                  </div>
                </DiscountName>

                <DiscountCode>
                  <FaTag /> {discount.code}
                </DiscountCode>

                <DiscountValue>
                  {discount.type === "percentage" ? (
                    <FaPercentage />
                  ) : (
                    <FaDollarSign />
                  )}
                  {discount.type === "percentage"
                    ? `${discount.value}% Off`
                    : `$${discount.value} Off`}
                </DiscountValue>

                <DiscountDates>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <FaCalendarAlt size={12} /> {formatDate(discount.startDate)}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <FaCalendarAlt size={12} /> {formatDate(discount.endDate)}
                  </div>
                </DiscountDates>

                <DiscountStatus active={discount.active}>
                  {discount.active ? "Active" : "Inactive"}
                </DiscountStatus>

                <DiscountUsage>
                  Used {discount.usage} of {discount.maxUsage} times
                </DiscountUsage>

                <DiscountActions>
                  <ActionButton title="Edit discount">
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    title="Delete discount"
                    onClick={() => handleDelete(discount.id)}
                  >
                    <FaTrash />
                  </ActionButton>
                </DiscountActions>
              </DiscountItem>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                No discounts found
              </div>
              <div style={{ color: "#6b7280", marginBottom: "24px" }}>
                Try adjusting your search or filter criteria
              </div>
              <PrimaryButton onClick={() => setShowCreateForm(true)}>
                <FaPlus /> Create Your First Discount
              </PrimaryButton>
            </div>
          )}
        </DiscountsContainer>

        {showCreateForm && (
          <CreateDiscountPanel>
            <PanelTitle>
              <FaTag /> Create New Discount
            </PanelTitle>

            <form onSubmit={handleSubmit}>
              <TwoColumnGrid>
                <div>
                  <FormGroup>
                    <Label>Discount Name *</Label>
                    <Input
                      type="text"
                      name="name"
                      value={newDiscount.name}
                      onChange={handleInputChange}
                      placeholder="Summer Sale, Black Friday, etc."
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Discount Code *</Label>
                    <Input
                      type="text"
                      name="code"
                      value={newDiscount.code}
                      onChange={handleInputChange}
                      placeholder="SUMMER25"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Discount Type *</Label>
                    <Select
                      name="type"
                      value={newDiscount.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="percentage">Percentage Discount</option>
                      <option value="fixed">Fixed Amount Discount</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      {newDiscount.type === "percentage"
                        ? "Discount Percentage *"
                        : "Discount Amount *"}
                    </Label>
                    <Input
                      type="number"
                      name="value"
                      value={newDiscount.value}
                      onChange={handleInputChange}
                      placeholder={
                        newDiscount.type === "percentage" ? "25" : "10.00"
                      }
                      min="1"
                      required
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormGroup>
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      name="startDate"
                      value={newDiscount.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>End Date *</Label>
                    <Input
                      type="date"
                      name="endDate"
                      value={newDiscount.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Maximum Usage (optional)</Label>
                    <Input
                      type="number"
                      name="maxUsage"
                      value={newDiscount.maxUsage}
                      onChange={handleInputChange}
                      placeholder="100"
                      min="1"
                    />
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: "4px",
                      }}
                    >
                      Leave blank for unlimited usage
                    </p>
                  </FormGroup>

                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      name="active"
                      checked={newDiscount.active}
                      onChange={handleInputChange}
                    />
                    <Label>Active Discount</Label>
                  </CheckboxContainer>
                </div>
              </TwoColumnGrid>

              <ButtonContainer>
                <PrimaryButton
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton type="submit">Create Discount</PrimaryButton>
              </ButtonContainer>
            </form>
          </CreateDiscountPanel>
        )}
      </ContentContainer>
    </DashboardContainer>
  );
};

export default SellerDiscountPage;
