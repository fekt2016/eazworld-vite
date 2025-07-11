import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import styled from "styled-components";
import useAuth from "../../hooks/auth/useAuth";
import { Link } from "react-router-dom";
import { useClearWishlist, useWishlist } from "../../hooks/useWishlist";
import { useCartTotals } from "../../hooks/useCart";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, userData, isLoading: isUserLoading } = useAuth();
  const { count: cartCount } = useCartTotals();

  const user = userData?.user || userData?.data || null;
  const { data: wishlistData } = useWishlist();
  const { mutate: clearWishlist } = useClearWishlist();
  const wishlist = useMemo(() => {
    return wishlistData?.data || [];
  }, [wishlistData]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logoutHandler = () => {
    logout.mutate();
    clearWishlist();
  };

  if (isUserLoading) return <div>Loading...</div>;

  return (
    <StyledHeader>
      <HeaderTop>
        <Logo>
          <LogoIcon>🛒</LogoIcon>
          <LogoText>Eaz Shop</LogoText>
        </Logo>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search for products, brands, and sellers..."
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchBar>

        <HeaderActions>
          <HeaderAction>
            {userData ? (
              <AccountDropdown ref={dropdownRef}>
                <AccountButton onClick={() => setShowDropdown(!showDropdown)}>
                  <ActionIcon>
                    <FaUser />
                  </ActionIcon>
                  <ActionText>{user.name || user.email}</ActionText>
                </AccountButton>
                {showDropdown && (
                  <DropdownMenu>
                    <DropdownItem as={Link} to="/profile">
                      My Profile
                    </DropdownItem>
                    <DropdownItem as={Link} to="/orders">
                      My Orders
                    </DropdownItem>
                    <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
                  </DropdownMenu>
                )}
              </AccountDropdown>
            ) : (
              <Link to="/login">
                <ActionIcon>
                  <FaUser />
                </ActionIcon>
                <ActionText>Account</ActionText>
              </Link>
            )}
          </HeaderAction>

          <HeaderAction>
            <Link to="/wishlist">
              <ActionIcon>
                <FaHeart />
                {wishlist?.products?.length > 0 && (
                  <ActionBadge>{wishlist.products.length}</ActionBadge>
                )}
              </ActionIcon>
              <ActionText>Wishlist</ActionText>
            </Link>
          </HeaderAction>

          <HeaderAction>
            <Link to="/cart">
              <ActionIcon>
                <FaShoppingCart />
                {cartCount > 0 && <ActionBadge>{cartCount}</ActionBadge>}
              </ActionIcon>
              <ActionText>Cart</ActionText>
            </Link>
          </HeaderAction>

          <MobileMenuButton onClick={toggleMobileMenu}>
            <FaBars />
          </MobileMenuButton>
        </HeaderActions>
      </HeaderTop>

      <Navigation $isOpen={isMobileMenuOpen}>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">Shop</NavLink>
        <NavLink href="#">Categories</NavLink>
        <NavLink href="#">Deals</NavLink>
        <NavLink href="#">Sellers</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Contact</NavLink>
      </Navigation>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  border-bottom: 1px solid #eaecf4;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #4e73df;
`;

const LogoIcon = styled.span`
  margin-right: 10px;
  font-size: 28px;
`;

const LogoText = styled.span``;

const SearchBar = styled.div`
  display: flex;
  flex: 0 0 40%;
  max-width: 500px;

  @media (max-width: 992px) {
    flex: 0 0 50%;
  }

  @media (max-width: 768px) {
    order: 3;
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 15px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #eaecf4;
  border-radius: 30px 0 0 30px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #4e73df;
  }
`;

const SearchButton = styled.button`
  background: #4e73df;
  color: white;
  border: none;
  padding: 0 25px;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #2e59d9;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const HeaderAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  color: #858796;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;

  &:hover {
    color: #4e73df;
  }

  @media (max-width: 480px) {
    font-size: 0;
  }
`;

const ActionIcon = styled.div`
  font-size: 22px;
  margin-bottom: 5px;
  position: relative;
`;

const ActionText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const ActionBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  font-size: 11px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4e73df;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  background: white;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    position: absolute;
    width: 100%;
    background: white;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #2e3a59;
  font-weight: 500;
  padding: 8px 15px;
  position: relative;
  transition: color 0.3s;
  margin: 0 10px;

  &:hover {
    color: #4e73df;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e73df;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 5px 0;
    padding: 12px 0;
  }
`;
const AccountDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

// Add AccountButton styled component
const AccountButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  outline: none;
  display: flex;
  flex-direction: column;

  &:hover {
    color: #4e73df;
  }
`;

// Add DropdownMenu styled component
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #eaecf4;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(46, 58, 89, 0.08);
  min-width: 180px;
  z-index: 1000;
  padding: 10px 0;
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  color: #2e3a59;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  display: block;

  &:hover {
    background: #f8f9fc;
    color: #4e73df;
  }
`;
