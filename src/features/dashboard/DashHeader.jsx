import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../authentication/UserAvatar";
import Timer from "../../ui/Timer";

const StyledHeader = styled.header`
  width: 100vw;
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4rem;
  position: sticky;
  top: 0;
  background-color: var(--color-white-0);
  z-index: 100;
`;
const P = styled.p`
  font-size: 0.8rem;
`;

function DashHeader() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
      <div>
        <Timer />
        <P>TimeOut</P>
      </div>
    </StyledHeader>
  );
}

export default DashHeader;
