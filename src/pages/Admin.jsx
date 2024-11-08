import Row from "../ui/Row";
import Heading from "../ui/Heading";
import styled from "styled-components";
import AdminHeader from "../features/admin/AdminHeader";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledAdmin = styled.div`
  background-color: var(--color-grey-200);
  padding: 1rem;
`;

function Admin() {
  const [user, setUser] = useState("");
  console.log(user);

  const navigate = useNavigate();
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

  if (user?.role === "user") return navigate("/dashboard");

  return (
    <StyledAdmin>
      <Row>
        <Heading as="h1">admin dashboard</Heading>
      </Row>
      <AdminHeader />
    </StyledAdmin>
  );
}

export default Admin;
