import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  //transition: all 0.5s ease; 
`;

const Container = styled.div`
  min-width: 254px; 
  height: 337px;  
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #FFFFFF;
  position: relative;
  border-radius: 4px;
  border: 1px solid #E5E5E5;
`;

const Summary = styled.div`
    //position: relative;
    margin-top: 9px;
    padding: 0 11px;    
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  z-index: 2; 
`;

const Title = styled.h3`
font-size: 12px;
font-style: normal;
font-weight: normal;
line-height: 18px;
color: #484848;
height: 32px;
`;

const Filter = styled.div``;

const FilterText = styled.span`
font-size: 12px;
font-weight: 400;
line-height: 18px;
color: #484848
`;

const FilterTextBold = styled(FilterText)`
  font-weight: 700;
`;

const PriceContainer = styled.div`
margin-top: 13px;
`;

const FirstPriceContainer = styled.div`
`;

const FirstPrice = styled.div`
color: #9B9B9B;
font-size: 13px;
line-height: 18px;
text-decoration-line: line-through;
display: inline-block;
`;

const LastPrice = styled.span`
font-weight: 700;
font-style: normal;
font-size: 14px;
line-height: 18px;
color: #000000;
`;

const DiscountRate = styled.span`
color: #F90000;
font-weight: 700;
font-size: 12px;
line-height: 18px;
`;

const AddToCardButton = styled.button`
width: 100%;
height: 32px;
cursor: pointer;
color: #FF6000;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
font-size: 14px;
font-weight: 500;
background: rgba(255, 96, 0, 0.11);
border: 0;
border-radius: 8px;
margin-right: 11px;
margin-left: 11px;
`;

const AddToCardStateButton = styled(AddToCardButton)`
background: rgba(126, 126, 126, 0.11);
color: #B0B0B0;
cursor: not-allowed;
`;

const Box = styled.div`  
  position: relative;  
  min-height: 465px;  
  margin-bottom: 21px;
  z-index:0;

  &:hover {
    border-radius: 4px;
    border: 1px solid #E5E5E5;   

    ${Container}{
    border: 0;    
    }

    ${Summary}{      
      margin: 10px -1px;      
    }

    ${Info}{
      opacity: 1;   
      }

    ${Filter}{
        display: none;   
      }      

      ${PriceContainer}{
        display: none;   
      }            
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {    
    item.inStock = false;

    dispatch(
      addProduct({ ...item })
    );

    const updateProduct = async () => {
      try {
        await publicRequest.put(`products/${item._id}`, item);
      } catch (err) {
      }
    };
    updateProduct();
    //instead window.location.reload() update productsState
  };

  let button;
  if (item.inStock) {
    button = <AddToCardButton onClick={handleClick}>Sepete Ekle</AddToCardButton>
  } else {
    button = <AddToCardStateButton>Bu ürünü sepete ekleyemezsiniz.</AddToCardStateButton>
  }

  return (
    <Box>
      <Container>
        <Circle />
        <Image src={item.img} />
      </Container>
      <Summary>
        <Title>{item.title}</Title>
        <Filter>
          <FilterTextBold>Marka: </FilterTextBold>
          <FilterText>{item.title}</FilterText>
        </Filter>
        <Filter>
          <FilterTextBold>Renk: </FilterTextBold>
          <FilterText>{item.color[0]}</FilterText>
        </Filter>
        <PriceContainer>
          <LastPrice>{item.price} TL</LastPrice>
          <FirstPriceContainer>
            <FirstPrice>{item.price} TL</FirstPrice>
            <DiscountRate> 12%</DiscountRate>
          </FirstPriceContainer>
        </PriceContainer>
      </Summary>
      <Info>        
        {button}
      </Info>
    </Box>
  );
};

export default Product;
