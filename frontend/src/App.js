import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
import Pay from './pages/Pay';
import Success from './pages/Success';
import Card from './pages/Card';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
