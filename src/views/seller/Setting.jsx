// import { useForm } from "react-hook-form";
// import useSellerAuth from "../../hooks/auth/useSellerAuth";
// import { useQueryClient } from "@tanstack/react-query";
// import defaultAvatar from "/avatar.png";

// import { useEffect, useState } from "react";
// import { compressImage } from "../../utils/imageCompressor";

// export default function Setting() {
//   const [activeTab, setActiveTab] = useState("profile");

//   const {
//     user: sellerDetails,
//     update: updateSeller,
//     imageUpdate,
//   } = useSellerAuth();

//   const avatar = sellerDetails?.avatar;
//   console.log(sellerDetails);

//   const [avatarPreview, setAvatarPreview] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   // const [btnShow, setBtnShow] = useState(false);

//   const queryClient = useQueryClient();

//   const tabs = [
//     { id: "profile", label: "Profile" },
//     { id: "payment", label: "Payment Methods" },
//     { id: "notifications", label: "Notifications" },
//     { id: "security", label: "Security" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       name: sellerDetails?.name || "",
//       email: sellerDetails?.email || "",
//       phone: sellerDetails?.phone || "",
//       shopName: sellerDetails?.shopName || "",
//       shopAddress: {
//         street: sellerDetails?.shopAddress?.street || "",
//         city: sellerDetails?.shopAddress?.city || "",
//         state: sellerDetails?.shopAddress?.state || "",
//         zipCode: sellerDetails?.shopAddress?.zipCode || "",
//         country: sellerDetails?.shopAddress?.country || "",
//       },
//     },
//   });

//   useEffect(() => {
//     if (sellerDetails) {
//       reset({
//         name: sellerDetails.name,
//         email: sellerDetails.email,
//         phone: sellerDetails.phone || "",
//         shopName: sellerDetails.shopName || "",
//         shopAddress: {
//           street: sellerDetails.shopAddress?.street || "",
//           city: sellerDetails.shopAddress?.city || "",
//           state: sellerDetails.shopAddress?.state || "",
//           zipCode: sellerDetails.shopAddress?.zipCode || "",
//           country: sellerDetails.shopAddress?.country || "",
//         },
//       });
//     }
//   }, [sellerDetails, reset]);
//   useEffect(() => {
//     console.log(avatar);
//     if (avatar) {
//       setAvatarPreview(avatar);
//     } else {
//       setAvatarPreview(defaultAvatar);
//     }
//   }, [avatar]);

//   const handleCoverImage = function (e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     setSelectedFile(file);
//     // Create preview for selected image
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatarPreview(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleProfileUpdate = async (data) => {
//     updateSeller.mutate(data, {
//       onSuccess: (response) => {
//         console.log("Updated seller:", response.data);
//         queryClient.setQueryData(["sellerAuth"], (oldData) => ({
//           ...oldData,
//           ...response.data.seller,
//         }));
//         reset(response.data.seller);
//         // queryClient.invalidateQueries(["sellerAuth"]);
//       },
//       onError: (error) => {
//         console.error("Update error:", error.response?.data || error.message);
//       },
//     });
//   };
//   const handleImageUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     // console.log(avatar);
//     try {
//       const compressedCover = await compressImage(selectedFile, {
//         quality: 0.7,
//         maxWidth: 1024,
//       });
//       formData.append("imageCover", compressedCover);

//       // for (const [key, value] of formData.entries()) {
//       //   console.log(key, value);
//       // }
//       imageUpdate.mutate(formData, {
//         onSuccess: (response) => {
//           console.log("Updated seller:", response.data);
//           const updatedSeller = response?.data.data;
//           queryClient.setQueryData(["sellerAuth"], (oldData) => ({
//             ...oldData,
//             avatar: updatedSeller.avatar,
//           }));

//           // queryClient.invalidateQueries(["sellerAuth"]);
//         },
//         onError: (error) => {
//           console.error("Update error:", error.response?.data || error.message);
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div style={{ backgroundColor: "blue", width: "100%" }}>
//             <div style={{ backgroundColor: "red", width: "100%" }}>
//               <form onSubmit={handleImageUpdate}>
//                 <label
//                   style={{
//                     height: "70px",
//                     width: "70px",
//                     borderRadius: "50%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden",
//                   }}
//                   htmlFor="image"
//                 >
//                   <img
//                     src={avatarPreview}
//                     alt="avatar image"
//                     onError={(e) => {
//                       // Fallback if all images fail to load
//                       e.target.src = defaultAvatar;
//                     }}
//                   />
//                 </label>
//                 <input
//                   hidden
//                   name="image"
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleCoverImage}
//                   // disabled={isSubmitting}
//                 />
//                 {avatarPreview !== avatar &&
//                   avatarPreview !== defaultAvatar && (
//                     <button
//                       style={{
//                         marginTop: "1rem",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         border: "none",
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         cursor: "pointer",
//                       }}
//                       type="submit"
//                     >
//                       Save Changes
//                     </button>
//                   )}
//                 {/* <button>delete picture</button> */}
//               </form>
//             </div>
//             <section
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <h2>Profile Information</h2>
//               <form onSubmit={handleSubmit(handleProfileUpdate)}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label>Full Name</label>
//                     <input
//                       {...register("name", { required: true })}
//                       defaultValue={sellerDetails?.name}
//                     />
//                     {errors.name && (
//                       <span className="text-red-500">Required</span>
//                     )}
//                   </div>
//                   <div>
//                     <label>Phone number</label>
//                     <input
//                       type="tel"
//                       {...register("phone", { required: true })}
//                       defaultValue={sellerDetails?.phone}
//                     />
//                     {errors.phone && <span>Required</span>}
//                   </div>
//                   <div>
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       {...register("email", { required: true })}
//                       defaultValue={sellerDetails?.email}
//                       className="w-full p-2 border rounded"
//                       disabled
//                     />
//                   </div>
//                   <div>
//                     <label>Store Name</label>
//                     <input
//                       {...register("shopName", { required: true })}
//                       defaultValue={sellerDetails.shopName}
//                       className="w-full p-2 border rounded"
//                     />
//                     {errors.shopName && (
//                       <span className="text-red-500">Required</span>
//                     )}
//                   </div>
//                   <div className="col-span-2">
//                     <h3 className="text-lg font-medium mb-2">Shop Address</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label>Street</label>
//                         <input
//                           defaultValue={sellerDetails.shopAddress.street || ""}
//                           {...register("shopAddress.street", {
//                             required: true,
//                           })}
//                         />
//                         {errors.shopAddress?.street && (
//                           <span className="text-red-500">Required</span>
//                         )}
//                       </div>
//                       <div>
//                         <label>City</label>
//                         <input
//                           defaultValue={sellerDetails.shopAddress.city || ""}
//                           {...register("shopAddress.city", {
//                             required: true,
//                           })}
//                           className="w-full p-2 border rounded"
//                         />
//                         {errors.shopAddress?.city && (
//                           <span className="text-red-500">Required</span>
//                         )}
//                       </div>
//                       <div>
//                         <label>State</label>
//                         <input
//                           defaultValue={sellerDetails.shopAddress.state || ""}
//                           {...register("shopAddress.state", {
//                             required: true,
//                           })}
//                         />
//                         {errors.shopAddress?.state && <span>Required</span>}
//                       </div>
//                       <div>
//                         <label>Zip Code</label>
//                         <input
//                           {...register("shopAddress.zipCode", {
//                             required: true,
//                           })}
//                           defaultValue={sellerDetails.shopAddress.zipCode || ""}
//                         />
//                         {errors.shopAddress?.zipCode && (
//                           <span className="text-red-500">Required</span>
//                         )}
//                       </div>
//                       <div>
//                         <label>Country</label>
//                         <input
//                           defaultValue={sellerDetails.shopAddress.country || ""}
//                           {...register("shopAddress.country", {
//                             required: true,
//                           })}
//                         />
//                         {errors.shopAddress?.country && (
//                           <span className="text-red-500">Required</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   disabled={updateSeller.isPending}
//                 >
//                   {updateSeller.isPending ? "Saving..." : "Save Profile"}
//                 </button>
//               </form>
//             </section>
//           </div>
//         );
//       case "payment":
//         return (
//           <div>
//             <h2>Payment Methods</h2>
//             <div>
//               <h3>Accepted Payment Methods</h3>
//               <div>
//                 <label>
//                   <input type="checkbox" />
//                   Credit/Debit Cards
//                 </label>
//                 <label>
//                   <input type="checkbox" />
//                   PayPal
//                 </label>
//                 <label>
//                   <input type="checkbox" />
//                   Bank Transfer
//                 </label>
//               </div>
//             </div>
//           </div>
//         );
//       case "notifications":
//         return (
//           <div>
//             <h2>Notification Settings</h2>
//             <div>
//               <div>
//                 <span>Order Notifications</span>
//                 <button>Configure</button>
//               </div>
//               <div>
//                 <span>Promotional Emails</span>
//                 <button>Configure</button>
//               </div>
//             </div>
//           </div>
//         );
//       case "security":
//         return (
//           <div>
//             <h2>Security Settings</h2>
//             <div>
//               <div>
//                 <span>Two-Factor Authentication</span>
//                 <button>Enable</button>
//               </div>
//               <div>
//                 <span>Password</span>
//                 <button>Change Password</button>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ display: "flex", backgroundColor: "gold", height: "90vh" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "20rem",
//           gap: "10px",
//           backgroundColor: "#ded9d9",
//           justifyContent: "center",
//           alignItems: "center",
//           // height: "100%",
//         }}
//       >
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             style={{
//               backgroundColor: activeTab === tab.id ? "blue" : "",
//               margin: "10px",
//               border: "none",
//               padding: "4px 8px ",
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       {renderTabContent()}
//     </div>
//   );
// }
import { useState } from "react";
import styled from "styled-components";

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
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 6px 6px 0 0;
  transition: all 0.2s;
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
    background: white;
    border: 1px solid #e5e7eb;
    border-bottom-color: transparent;
    color: #3b82f6;
  `
      : `
    color: #6b7280;
    border: none;
    background: transparent;
    
    &:hover {
      color: #4b5563;
    }
  `}
`;

const SettingsPanel = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
`;

const PanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
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
  padding: 8px 12px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarPreview = styled.div`
  width: 128px;
  height: 128px;
  background-color: #e5e7eb;
  border: 2px dashed #9ca3af;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 16px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadButton = styled.label`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;

  &:hover {
    background-color: #2563eb;
  }

  input {
    display: none;
  }
`;

const PaymentSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const PaymentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const ToggleButton = styled.button`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ active }) => (active ? "#3b82f6" : "#d1d5db")};
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${({ active }) => (active ? "22px" : "2px")};
    transition: left 0.2s;
  }
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

// const PaymentOptionContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 12px;
// `;

// Main Component
const SellerSettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profile, setProfile] = useState({
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Professional seller with 5 years experience",
    avatar: "",
  });

  // Payment state
  const [payment, setPayment] = useState({
    bankName: "City Bank",
    accountNumber: "**** **** **** 1234",
    routingNumber: "******",
    cashEnabled: true,
    mobileMoneyEnabled: false,
    mobileMoneyProvider: "MTN",
    mobileMoneyNumber: "",
  });

  // Store state
  const [store, setStore] = useState({
    storeName: "Jane's Boutique",
    description: "High-quality fashion accessories",
    policies: "30-day return policy",
    shippingOptions: ["Standard", "Express", "International"],
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    password: "********",
  });

  // Handle input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle payment options
  const togglePaymentOption = (option) => {
    setPayment((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Toggle 2FA
  const toggleTwoFactor = () => {
    setSecurity((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
  };

  // Handle avatar upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile((prev) => ({ ...prev, avatar: event.target.result }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <DashboardContainer>
      <ContentContainer>
        <Title>Seller Settings</Title>

        <TabsContainer>
          {["profile", "payment", "store", "security"].map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabButton>
          ))}
        </TabsContainer>

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <SettingsPanel>
            <PanelTitle>Profile Information</PanelTitle>
            <TwoColumnGrid>
              <AvatarContainer>
                <AvatarPreview>
                  {profile.avatar ? (
                    <AvatarImage src={profile.avatar} alt="Avatar" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="#9ca3af"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 5h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm16 4.586l-8 8-8-8V7h16v2.586zM4 7v10h16V7H4z" />
                    </svg>
                  )}
                </AvatarPreview>
                <UploadButton>
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </UploadButton>
              </AvatarContainer>

              <div>
                <div style={{ display: "grid", gap: "16px" }}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Bio</Label>
                    <TextArea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                    />
                  </FormGroup>
                </div>

                <ButtonContainer>
                  <SaveButton>Save Changes</SaveButton>
                </ButtonContainer>
              </div>
            </TwoColumnGrid>
          </SettingsPanel>
        )}

        {/* Payment Settings */}
        {activeTab === "payment" && (
          <SettingsPanel>
            <PanelTitle>Payment Methods</PanelTitle>
            <TwoColumnGrid>
              <PaymentSection>
                <PaymentTitle>Bank Account</PaymentTitle>
                <FormGroup>
                  <Label>Bank Name</Label>
                  <Input
                    type="text"
                    name="bankName"
                    value={payment.bankName}
                    onChange={handlePaymentChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Account Number</Label>
                  <Input
                    type="text"
                    name="accountNumber"
                    value={payment.accountNumber}
                    onChange={handlePaymentChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Routing Number</Label>
                  <Input
                    type="text"
                    name="routingNumber"
                    value={payment.routingNumber}
                    onChange={handlePaymentChange}
                  />
                </FormGroup>
              </PaymentSection>

              <div>
                <PaymentSection>
                  <PaymentTitle>Cash Payments</PaymentTitle>
                  <ToggleContainer>
                    <div>
                      <h3 style={{ fontWeight: 500 }}>Accept Cash Payments</h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Enable to accept cash payments on delivery
                      </p>
                    </div>
                    <ToggleButton
                      active={payment.cashEnabled}
                      onClick={() => togglePaymentOption("cashEnabled")}
                    />
                  </ToggleContainer>

                  {payment.cashEnabled && (
                    <div style={{ marginTop: "16px" }}>
                      <Label>Cash Payment Instructions</Label>
                      <TextArea
                        placeholder="Add specific instructions for cash payments (e.g. exact change required)"
                        style={{ minHeight: "80px" }}
                      />
                    </div>
                  )}
                </PaymentSection>

                <PaymentSection>
                  <PaymentTitle>Mobile Money</PaymentTitle>
                  <ToggleContainer>
                    <div>
                      <h3 style={{ fontWeight: 500 }}>Accept Mobile Money</h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Enable to accept mobile money payments
                      </p>
                    </div>
                    <ToggleButton
                      active={payment.mobileMoneyEnabled}
                      onClick={() => togglePaymentOption("mobileMoneyEnabled")}
                    />
                  </ToggleContainer>

                  {payment.mobileMoneyEnabled && (
                    <div style={{ marginTop: "16px" }}>
                      <FormGroup>
                        <Label>Mobile Money Provider</Label>
                        <Select
                          name="mobileMoneyProvider"
                          value={payment.mobileMoneyProvider}
                          onChange={handlePaymentChange}
                        >
                          <option value="MTN MoMo">MTN MoMo</option>
                          <option value="Airtel Cash">Airtel Cash</option>
                          <option value="Telesom Cel Cash">
                            Telesom Cel Cash
                          </option>
                        </Select>
                      </FormGroup>

                      <FormGroup>
                        <Label>Mobile Money Number</Label>
                        <Input
                          type="text"
                          name="mobileMoneyNumber"
                          value={payment.mobileMoneyNumber}
                          onChange={handlePaymentChange}
                          placeholder="Your registered mobile number"
                        />
                      </FormGroup>
                    </div>
                  )}
                </PaymentSection>
              </div>
            </TwoColumnGrid>

            <ButtonContainer>
              <SaveButton>Update Payment Methods</SaveButton>
            </ButtonContainer>
          </SettingsPanel>
        )}

        {/* Store Settings */}
        {activeTab === "store" && (
          <SettingsPanel>
            <PanelTitle>Store Settings</PanelTitle>
            <FormGroup>
              <Label>Store Name</Label>
              <Input
                type="text"
                name="storeName"
                value={store.storeName}
                onChange={handleStoreChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                name="description"
                value={store.description}
                onChange={handleStoreChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Return Policies</Label>
              <TextArea
                name="policies"
                value={store.policies}
                onChange={handleStoreChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Shipping Options</Label>
              <div>
                {store.shippingOptions.map((option, index) => (
                  <CheckboxContainer key={index}>
                    <Checkbox
                      type="checkbox"
                      id={`option-${index}`}
                      defaultChecked
                    />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </CheckboxContainer>
                ))}
              </div>
            </FormGroup>

            <ButtonContainer>
              <SaveButton>Save Store Settings</SaveButton>
            </ButtonContainer>
          </SettingsPanel>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <SettingsPanel>
            <PanelTitle>Security Settings</PanelTitle>

            <ToggleContainer>
              <div>
                <h3 style={{ fontWeight: 500 }}>Two-Factor Authentication</h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Add an extra layer of security to your account
                </p>
              </div>
              <ToggleButton
                active={security.twoFactorEnabled}
                onClick={toggleTwoFactor}
              />
            </ToggleContainer>

            <div
              style={{
                paddingTop: "16px",
                borderTop: "1px solid #e5e7eb",
                marginTop: "16px",
              }}
            >
              <h3 style={{ fontWeight: 500, marginBottom: "16px" }}>
                Change Password
              </h3>

              <FormGroup>
                <Label>Current Password</Label>
                <Input type="password" />
              </FormGroup>

              <FormGroup>
                <Label>New Password</Label>
                <Input type="password" />
              </FormGroup>

              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </FormGroup>
            </div>

            <ButtonContainer>
              <SaveButton>Update Security Settings</SaveButton>
            </ButtonContainer>
          </SettingsPanel>
        )}
      </ContentContainer>
    </DashboardContainer>
  );
};

export default SellerSettingsDashboard;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
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
