import styled from 'styled-components';
import Product from './Product';
import useSWR from 'swr';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ sort, filter, category }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  let { data, error } = useSWR(
    category
      ? `http://localhost:4000/api/products?category=${category}`
      : 'http://localhost:4000/api/products',
    fetcher
  );
  data = filter?.color
    ? data.filter((product) =>
        Object.entries(filter).every(([key, value]) => product[key] === value)
      )
    : data;

  if (sort) {
    data = data.sort((a, b) => {
      console.log(data);
      if (sort === 'asc') {
        return a.price - b.price;
      }
      if (sort === 'desc') {
        return b.price - a.price;
      }
      if (sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  return (
    <Container>
      {data.map((item, index) => (
        <Product key={index} item={item} />
      ))}
    </Container>
  );
};

export default Products;
