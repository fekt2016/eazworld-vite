import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Sidebar from "./Sidebar";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
`;

export default function MainLayout() {
  return (
    <Container>
      {/* <Sidebar /> */}
      <Main>
        <Header />
        <div>
          <Outlet />
        </div>
      </Main>
    </Container>
  );
}
