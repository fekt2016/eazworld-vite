import styled from "styled-components";

function Logonav() {
    return (
        <Logo> Logo </Logo>
    )
}

const Logo = styled.nav`
font-size: 15px;
height: 60px;
color: white;
width: 80px;
background-color: violet;
border-radius: 10px;
margin: 25px 0 0 15px;
display: flex;
align-items: center;
justify-content: center;


`;

export {Logonav}