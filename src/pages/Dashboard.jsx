import Heading from "../ui/Heading";
import PriceCard from "../ui/Price";
import Row from "../ui/Row";

import styled from "styled-components";
import { useTest } from "../features/test/useTest";
import TestCard from "../ui/TestCard";
import Spinner from "../ui/Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import AdminHeader from "../features/admin/AdminHeader";

const StyledLink = styled(Link)`
  background-color: black;
  text-transform: capitalize;
  color: var(--color-white-0);
  padding: 1rem;
`;

const StyledAdmin = styled.div`
  background-color: var(--color-grey-200);
  padding: 1rem;
`;
const Test = styled.div`
  padding: 3rem;
  background-color: var(--color-black-200);
`;
function Dashboard() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const { data: dataList, isLoading } = useTest();

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) return navigate("/login");

      const { session: data } = session;
      const { user: curUser } = data;

      const { data: user } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", curUser.id);

      setUser(user[0]);
    };

    getUser();
  }, [navigate]);
  if (user?.role === "admin")
    return (
      <StyledAdmin>
        <Row>
          <Heading as="h1">admin dashboard</Heading>
        </Row>
        <AdminHeader />
      </StyledAdmin>
    );

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Dashbaord</Heading>
        {user?.role === "admin" && (
          <StyledLink to="/admin">admin dashboard</StyledLink>
        )}
      </Row>
      <Row>
        <PriceCard />
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <Test>
          <Slider {...settings}>
            {dataList.map((item) => (
              <TestCard
                key={item.id}
                fullName={item.fullName}
                msg={item.msg}
                loc={item.loc}
              />
            ))}
          </Slider>
        </Test>
      )}
    </>
  );
}

export default Dashboard;
