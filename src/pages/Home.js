import React from 'react';
import Announcement from '../componenets/Announcement';
import Categories from '../componenets/Categories';
import Footer from '../componenets/Footer';
import Navbar from '../componenets/Navbar';
import Newsletter from '../componenets/NewsLetter';
import Products from '../componenets/Products';
import Slider from '../componenets/Slider';

export default function Home() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}
