import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: 14px;
  font-weight: bold;
`;

export default function Announcement() {
  return <Container>Super Deal! Free Shipping on orders over $50</Container>;
}
