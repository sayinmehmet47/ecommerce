import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Language = styled.div`
  font-size: 16px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const Input = styled.input`
  border: 0;
  border-radius: 5px;
  padding: 5px;
  width: 200px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>TR</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <span role="img" aria-label="logo">
              🦄
            </span>
          </Logo>
        </Center>
        <Right>
          <MenuItem>Register</MenuItem>
          <MenuItem>Login</MenuItem>
          <MenuItem>
            {' '}
            <NavLink to="/card">
              <Badge
                overlap="rectangular"
                badgeContent={String(quantity)}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </NavLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}
