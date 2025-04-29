import styled from "styled-components";
// import { Navbar } from "./nav";
// import { Usernav } from "./user";
import { Logonav } from "./logo";
import { SearchEngine } from "./search";


function Header() {
    return (
    
            <Styleheader> 
                <Logonav></Logonav>

                <FullNav>
                    <UpNav>
                        <Best>
                            <a href="url">Best Selling Items</a>
                            <a href="url">Support 🎧</a>
                        </Best>

                        <Daily>
                            <a href="url">Daily Deals</a>
                            <a href="url">New Arrivals</a>
                            <a href="url">Wishlist</a>
                        </Daily>

                    </UpNav>

                    <LineNav></LineNav>

                    <DownNav>
                        <Cat>
                            <a href="url">All Categories</a>
                            <SearchEngine>
                                <p>
                                Search for Product...
                                </p>

                                <p>🔍</p>
                            
                            </SearchEngine>
                            {/* <a href="url">Support</a> */}
                        </Cat>

                        <Log>
                            <LogIn>
                                <a href="url">Log In/Sign Up</a>
                            </LogIn>
                            <a href="url">🛒 Cart</a>
                        </Log>
                    </DownNav>

                </FullNav>





                {/* <Navbar></Navbar> */}
                {/* <Usernav></Usernav> */}
            </Styleheader>

    )
}

const Styleheader = styled.header`
font-size: 24px;
color: orangered;
height: 122px;
font-family: Arial;
background-color: beige;
display: flex;
/* justify-content: space-between; */

`;

const Best = styled.header`
display: flex;
justify-content: space-between;
/* background-color: violet; */
width: 650px;

`;


const Daily = styled.header`
display: flex;
justify-content: space-around;
/* background-color: pink; */
width: 500px;

`;

const Cat = styled.header`
display: flex;
justify-content: space-between;
/* background-color: yellow; */
/* width: 700px; */

`;


const Log = styled.header`
display: flex;
justify-content: space-around;
/* background-color: greenyellow; */
width: 550px;
`;

const LogIn = styled.header`
font-weight: bold;

`;


const UpNav = styled.header`
display: flex;
/* width: 100%; */
justify-content: space-between;
padding-left: 20px;
`;

const LineNav = styled.header`
height: 10px;
/* width: 100%; */
background-color: #E4E0E0;
margin-left: 10px;
/* padding-left: 20px; */

`;

const DownNav = styled.header`
display: flex;
/* width: 100%; */
justify-content: space-between;
padding-left: 20px;

`;

const FullNav = styled.header`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;

`;





export {Header}
