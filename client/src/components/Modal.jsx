import React from 'react'
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/cartRedux";

const Container = styled.div`
width: 400px;
height: 260px;
background: #FFFFFF;
border: 1px solid rgba(228, 228, 228, 0.6);
box-sizing: border-box;
box-shadow: 0px 6px 12px rgba(50, 50, 71, 0.07);
border-radius: 4px;`;

const Title = styled.h1`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 100%;
color: #484848;
padding: 23px 18px 20px;
border-bottom: 1px solid #CDCDCD;
`;

const ContentWrapper = styled.div`
width: 342px;
height: 128px;
margin-left: 20px;
margin-right: 38px; 
`;

const Content = styled.p`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 140%;
color: #484848;
margin-top: 16px;
margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
`;

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
color: #FFFFFF;
font-weight: 500;
font-size: 12px;
border-radius: 4px;
width: 70px;
height: 26px;
border: 0;
cursor: pointer;
`;

const ConfirmButton = styled(Button)`
background: #90D659;
`;

const CancelButton = styled(Button)`
background: #D65959;
margin-left: 10px;
margin-right: 20px;
`;

const Modal = (props) => {
    const dispatch = useDispatch();
    
    const handleClick = () => {
        dispatch(
          deleteProduct(props)
        );
      };

    return (
        <Container>
            <Title>Ürünü silmek istediğinize emin misiniz? {props.id}</Title>
            <ContentWrapper>
                <Content>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentiall....</Content>
            </ContentWrapper>
            <ButtonWrapper>                
                <ConfirmButton onClick={handleClick}>EVET</ConfirmButton>
                <CancelButton>HAYIR</CancelButton>                
            </ButtonWrapper>
        </Container>
    )
}

export default Modal;
