import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export const Center = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Button = styled.button`
  background: ${(props) => (props.primary ? '#4caf50' : '#f44336')};
  color: white;
  font-size: 1.2rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${(props) => (props.primary ? '#43a047' : '#f44220')};
  }
`;

export default function Pay() {
  const STRIPE_KEY =
    'pk_test_51LP6aiGCJMINMCUu3IORbXLsC0BdY227snNxLUSOcnAGk7PKfvNj9GdEkrddwqFoUc7e7VzmIaLuL1NTX6bz83hn00uJ2Lz06v';
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    try {
      const makeRequest = async () => {
        const res = axios.post('http://localhost:4000/api/payment', {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
      };
      stripeToken && makeRequest();
    } catch (error) {
      console.log(error);
    }
  }, [stripeToken]);

  return (
    <StripeCheckout
      description="Your total amount is $20" // the pop-in header subtitle
      billingAddress
      shippingAddress
      name="Mehmet shop"
      amount={2000}
      token={onToken}
      stripeKey={STRIPE_KEY}
    >
      <Center>
        <Button>Pay</Button>
      </Center>
    </StripeCheckout>
  );
}
