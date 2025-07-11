import { useMemo } from "react";
import styled from "styled-components";

import HeroSlider from "../components/slider/HeroSlider";
import useProduct from "../../hooks/product/useProduct";

import ProductCard from "../components/productCard";

const HomePage = () => {
  const { getProducts } = useProduct();

  const { data: productsData, isLoading: isProductLoading } = getProducts;
  const products = useMemo(() => {
    return productsData?.results || [];
  }, [productsData]);

  const sellers = [
    {
      id: 1,
      name: "TechGadgets",
      rating: 4.8,
      products: 124,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    },
    {
      id: 2,
      name: "FashionHub",
      rating: 4.7,
      products: 89,
      image:
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 3,
      name: "HomeEssentials",
      rating: 4.9,
      products: 76,
      image:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
  ];
  //   // Sample data for the slider
  const sliderItems = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Up to 50% off on all summer items",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      buttonText: "Shop Now",
      bgColor: "#ff9a9e",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover our latest collection",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      buttonText: "Explore",
      bgColor: "#a1c4fd",
    },
    {
      id: 3,
      title: "Winter Essentials",
      subtitle: "Stay warm with our premium collection",
      image:
        "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      buttonText: "Get Warm",
      bgColor: "#ffecd2",
    },
  ];
  const categories = [
    { id: 1, name: "Electronics", icon: "📱", count: 24 },
    { id: 2, name: "Fashion", icon: "👕", count: 36 },
    { id: 3, name: "Home & Kitchen", icon: "🏠", count: 18 },
    { id: 4, name: "Beauty", icon: "💄", count: 15 },
    { id: 5, name: "Sports", icon: "⚽", count: 22 },
    { id: 6, name: "Books", icon: "📚", count: 31 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
  };

  // Toggle mobile menu

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <HeroSlider items={sliderItems} />
      <Section>
        <SectionHeader>
          <SectionTitle>Shop by Category</SectionTitle>
          <SectionSubtitle>Browse our popular categories</SectionSubtitle>
        </SectionHeader>

        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.id}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
              <CategoryCount>{category.count} items</CategoryCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Section>
      <Section>
        <ProductsGrid>
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </ProductsGrid>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Top Sellers</SectionTitle>
          <SectionSubtitle>Shop from our trusted sellers</SectionSubtitle>
        </SectionHeader>

        <SellersGrid>
          {sellers.map((seller) => (
            <SellerCard key={seller.id}>
              <SellerImage>
                <img src={seller.image} alt={seller.name} />
              </SellerImage>
              <SellerInfo>
                <SellerName>{seller.name}</SellerName>
                <SellerRating>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} $filled={i < Math.floor(seller.rating)}>
                      ★
                    </Star>
                  ))}
                  <RatingValue>{seller.rating}</RatingValue>
                </SellerRating>
                <SellerProducts>{seller.products} products</SellerProducts>
                <VisitStoreButton>Visit Store</VisitStoreButton>
              </SellerInfo>
            </SellerCard>
          ))}
        </SellersGrid>
      </Section>
      <NewsletterSection>
        <NewsletterContent>
          <NewsletterTitle>Subscribe to Our Newsletter</NewsletterTitle>
          <NewsletterText>
            Get the latest updates on new products and special promotions
          </NewsletterText>
          <NewsletterForm>
            <NewsletterForm onSubmit={handleSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email address"
              />
              <NewsletterButton>Subscribe</NewsletterButton>
            </NewsletterForm>
          </NewsletterForm>
        </NewsletterContent>
      </NewsletterSection>
      <Footer>
        <FooterGrid>
          <FooterColumn>
            <FooterTitle>EazShop</FooterTitle>
            <FooterText>
              Your one-stop destination for all your shopping needs. Discover
              thousands of products from trusted sellers.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#">
                <i>📱</i>
              </SocialLink>
              <SocialLink href="#">
                <i>📘</i>
              </SocialLink>
              <SocialLink href="#">
                <i>📸</i>
              </SocialLink>
              <SocialLink href="#">
                <i>🐦</i>
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#">Shop</FooterLink>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Categories</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Electronics</FooterLink>
              <FooterLink href="#">Fashion</FooterLink>
              <FooterLink href="#">Home & Kitchen</FooterLink>
              <FooterLink href="#">Beauty</FooterLink>
              <FooterLink href="#">Sports</FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Contact Us</FooterTitle>
            <ContactInfo>
              <ContactItem>📌 E1/12 Nima highway Street, Accra</ContactItem>
              <ContactItem>📞 0244388190</ContactItem>
              <ContactItem>✉️ eazworld.com</ContactItem>
              <ContactItem>🕒 Mon-Fri: 9AM - 6PM</ContactItem>
            </ContactInfo>
          </FooterColumn>
        </FooterGrid>

        <Copyright>
          © {new Date().getFullYear()} eazShop. All rights reserved.
        </Copyright>
      </Footer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  background-color: #f8f9fc;
  color: #2e3a59;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Section = styled.section`
  padding: 60px 5%;
  background: white;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2e3a59;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #858796;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  padding: 30px 20px;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #eaecf4;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: #4e73df;
  }
`;

const CategoryIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const CategoryName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CategoryCount = styled.p`
  color: #858796;
  font-size: 14px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const Star = styled.span`
  color: ${(props) => (props.$filled ? "#ffc107" : "#e0e0e0")};
  margin-right: 3px;
`;

// const ProductRating = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

const SellersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const SellerCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border: 1px solid #eaecf4;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SellerImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 3px solid #f8f9fc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SellerInfo = styled.div`
  flex: 1;
`;

const SellerName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const SellerRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SellerProducts = styled.p`
  font-size: 14px;
  color: #858796;
  margin-bottom: 15px;
`;

const VisitStoreButton = styled.button`
  padding: 8px 16px;
  background: #f8f9fc;
  color: #4e73df;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #4e73df;
    color: white;
  }
`;

const NewsletterSection = styled.div`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 15px;
  padding: 70px 5%;
  margin: 0 5% 60px;
  color: white;
  text-align: center;
`;

const NewsletterContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const NewsletterTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const NewsletterText = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsletterForm = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 16px;
  outline: none;

  @media (max-width: 576px) {
    border-radius: 50px;
    margin-bottom: 10px;
  }
`;

const NewsletterButton = styled.button`
  background: #1cc88a;
  color: white;
  border: none;
  padding: 0 30px;
  border-radius: 0 50px 50px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #17a673;
  }

  @media (max-width: 576px) {
    border-radius: 50px;
    padding: 15px;
  }
`;

const Footer = styled.footer`
  background: #2e3a59;
  color: white;
  padding: 70px 5% 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: #1cc88a;
  }
`;

const FooterText = styled.p`
  color: #b0b3b8;
  margin-bottom: 20px;
  line-height: 1.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #4e73df;
    transform: translateY(-3px);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled.a`
  color: #b0b3b8;
  text-decoration: none;
  transition: color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    color: white;
  }

  &::before {
    content: "→";
    margin-right: 10px;
    color: #1cc88a;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  color: #b0b3b8;

  &::before {
    content: "•";
    margin-right: 10px;
    color: #1cc88a;
    font-size: 20px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 25px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #b0b3b8;
  font-size: 14px;
`;

const RatingValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2e3a59;
  margin-left: 8px;
`;

// Add AccountDropdown styled component

export default HomePage;
