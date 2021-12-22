import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div``; 

const Band = styled.div`
 width: 100%;
 height: 1px;
 box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.35);  
`;

const Section = styled.section`
display: flex;
justify-content: space-between;
margin-top: 24px;
margin-bottom: 15px;
padding: 0 80px;
z-index: 20;
position: relative;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;  
`;

const SearchedWordContainer = styled.div``;

const SearchedWordText = styled.span`
font-size: 15px;
color: #B0B0B0;
`;

const SearchedWordTextDark = styled(SearchedWordText)`
color: #484848;
`;

const Option = styled.option``;

const SortingButton = styled.select`
display: flex;
cursor: pointer;
border-radius: 4px;
width: 120px;
height: 48px;
color: #B0B0B0;
background-color: #FFFFFF;
font-size: 17px;
border: 1px solid #B0B0B0;
box-sizing: border-box;

&:focus {
  outline: none;
}
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  z-index: 20;
`;

const VerticalFilter = styled.div`
 margin-bottom: 20px;
`;

const VerticalFilterText = styled.h3`
font-weight: 500;
font-size: 16px;
line-height: 24px;
margin-top: 24px;
margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
  color: #646464;

  &:hover{
    color: #FF6000;
  }
`;

const Aside = styled.aside``;

const ProductsContainer = styled.div``;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [sort, setSort] = useState("newest");
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await publicRequest.get(`/products/colors`);
        setColors(res.data);
      } catch {}
    };
    getColors();
  },[]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await publicRequest.get(`/products/brands`);
        setBrands(res.data);
      } catch {}
    };
    getBrands();
  },[]);
  
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar /> 
      <Band></Band>
      <Section>
      <SearchedWordContainer>
      <Title>Lorem ipsum dolor sit amet</Title>
        <SearchedWordText>Aranan Kelime: </SearchedWordText>
        <SearchedWordTextDark>It will come to the searched word</SearchedWordTextDark>
      </SearchedWordContainer>  
      <SortingButton onChange={(e) => setSort(e.target.value)}>          
            <Option value="0">Sıralama</Option>
            <Option value="asc">En Düşük Fiyat</Option>
            <Option value="desc">En Yüksek Fiyat</Option>
            <Option value="newest">En Yeniler (A&gt;Z)</Option>
            <Option value="newestDesc">En Yeniler (Z&gt;A)</Option>           
       </SortingButton>
      </Section>
      <Main>
        <Aside>
      <VerticalFilter>
      <VerticalFilterText>Renk</VerticalFilterText>
        <List>      
        {colors.map(color => (  
           <ListItem key={color} onClick={() => setColor(color)}>{color}</ListItem>
          ))}   
        </List>
        </VerticalFilter>
        <VerticalFilter>
      <VerticalFilterText>Sıralama</VerticalFilterText>
        <List>
            <ListItem onClick={() => setSort('asc')}>En Düşük Fiyat</ListItem>
            <ListItem onClick={() => setSort('desc')}>En Yüksek Fiyat</ListItem>
            <ListItem onClick={() => setSort('newest')}>En Yeniler (A&gt;Z)</ListItem>
            <ListItem onClick={() => setSort('newestDesc')}>En Yeniler (Z&gt;A)</ListItem>
        </List>
        </VerticalFilter>        
        <VerticalFilter>
      <VerticalFilterText>Marka</VerticalFilterText>
        <List>
        {brands.map(brand => (  
           <ListItem key={brand} onClick={() => {setBrand(brand)}}>{brand}</ListItem>
          ))}   
        </List>
        </VerticalFilter>
        </Aside>
        <ProductsContainer>
      <Products brand={brand} color={color} filters={filters} sort={sort} />
        </ProductsContainer>
      </Main>
    </Container>
  );
};

export default ProductList;
