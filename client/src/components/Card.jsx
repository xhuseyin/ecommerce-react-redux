import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import Modal from './Modal';
import ModalWrapper from "react-modal";
import { useState } from "react";

const Container = styled.div`
background: #FFFFFF;
border: 1px solid #B0B0B0;
box-sizing: border-box;
border-radius: 4px;
padding: 21px;
width: 360px;
height: 360px;
overflow-x: hidden;
overflow-y: scroll;
position: absolute;
top: 47px;
right: 0;
opacity: ${(props) => props.isOpen === false ? '0' : '1'};
border-top-right-radius: ${(props) => props.borderTopRightRadius};
z-index : ${(props) => props.isOpen === false ? '10' : '30'};
`;

const Info = styled.div``;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  display: flex;
`;

const ImageFigure = styled.figure`
  width: 3.8rem;
  height: 3.8rem;
  border: solid 1px #E5E5E5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
width: 3.5rem;
height: 3.5rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

const TextWrapper = styled.div``;

const Text = styled.h3`
font-size: 12px;
font-weight: 400;
line-height: 18px;
color: #484848;
`;

const ProductDeleteButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border-radius: 4px;
width: 49px;
height: 18px;
color: #F90000;
background-color: #FFFFFF;
font-size: 10px;
border: 1px solid #F90000;
box-sizing: border-box;
`;

const modalStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',    
    padding: 0,
    border: 0,
    backgroundColor: 'none',
  },
};

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const [id, setId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);  // fix: it should not a toggle    
  }

  const containerstyles = {
    borderTopRightRadius: 0, 
  };

  return (
    <>
    <Container isOpen={props.isOpen} 
    style={ props.isOpen === true ? { ...containerstyles } : {}}>          
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <ImageFigure>
                  <Image src={product.img} />
                  </ImageFigure>
                  <Details>
                    <TextWrapper>
                    <Text>
                      {product.title}
                    </Text>
                    <Text></Text>
                    </TextWrapper>
                    <ProductDeleteButton
                       onClick={() => { 
                       setIsOpen(!isOpen);
                       setId(product._id); 
                      }}         
                    >
                      Kaldır</ProductDeleteButton>
                  </Details>
                </ProductDetail> 
              </Product>
            ))}        
          </Info>        
    </Container>

  <ModalWrapper        
        isOpen={isOpen}
        onRequestClose={toggleModal}
        ariaHideApp={false}
        style={{...modalStyles, overlay: { backgroundColor: 'rgba(0,0,0,0.3)'}}}
        >
    <Modal id={id}></Modal>
  </ModalWrapper>
    </>

  );
};

export default Cart;
