import styled from "styled-components";

const Button = styled.button`
color: white;
background: #f8049c;
font-weight: bold;
padding: 8px;
border-radius: 4px;
box-shadow: none;
font-size: 1em;
width: 100%;
display: block;
white-space: none;

&:disabled{
    background: #eee;
    color: #666;
}

`;


const SearchEngine = styled.button`
color: #474747;
background-color: #fff;
border-radius: 10px;
font-size: 14px;
border: 1px solid #716D6D;
/* border: none; */
/* box-shadow: none; */
height: 45px;
width: 650px;
margin-left: 15px;
/* text-align: left; */
display: flex;
justify-content: space-between;






`;

export {Button};

export {SearchEngine};











