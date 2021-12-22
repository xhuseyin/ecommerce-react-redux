import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Logo from '../images/logo.svg'
import SearchIcon from '../images/search.svg'

const Container = styled.div`
  height: 96px;     
  padding: 0 80px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
`;

const SearchContainer = styled.div`
  height: 48px;
  background-color: #EEEEEE;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 0 27px;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-content: center;
  border: 0;
  background: none;
  cursor: pointer;
  padding-right: 11.5px;
`;

const Input = styled.input`
  border: none;
  background: #EEEEEE;
  color: #B0B0B0;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 0%;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Badge = styled.div`
display: inline-table;
vertical-align: middle;
width: 18px;
height: 18px;
background-color: #FF6000;
border-radius: 50%;
position: absolute;
top: -7px;
right: -4px;
`;

const BadgeContent = styled.div`
display: table-cell;
vertical-align: middle;
text-align: center;
font-weight: 500;
font-size: 12px;
line-height: 100%;
color: #FFFFFF;
`;

const CardWrapper = styled.div``;

const CardButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border-radius: 4px;
width: 120px;
height: 48px;
color: #B0B0B0;
background-color: #FFFFFF;
font-size: 17px;
box-sizing: border-box;
position: relative;
border: 1px solid #B0B0B0;

// border-bottom-color: #FFFFFF;
// border-bottom-left-radius: 0;
// border-bottom-right-radius: 0;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const quantity = useSelector(state => state.cart.quantity);

  const handleMouseOver = () => {
    setIsOpen(true);

  }
  const handleMouseLeave = () => {
    setIsOpen(false);
  }

  const cartButtonStyles = {
    borderBottomColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0, 
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <img src={Logo} alt="hepsiburada" />
        </Left>
        <Center>
        <SearchContainer>
          <SearchButton>
               <img src={SearchIcon} alt="search" />
          </SearchButton>
            <Input  placeholder="25 milyon’dan fazla ürün içerisinde ara"/>
          </SearchContainer>
        </Center>
        <Right>
        <CardWrapper onMouseLeave={handleMouseLeave}>
        <CardButton onMouseOver={handleMouseOver} style={ isOpen === true ? { ...cartButtonStyles } : {}}>Sepetim
        <Badge>
            <BadgeContent>{quantity}</BadgeContent>
        </Badge>
        </CardButton>     
        <Card isOpen={isOpen}/>
        </CardWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
