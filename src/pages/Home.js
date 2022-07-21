import React from 'react';
import Announcement from '../componenets/Announcement';
import Navbar from '../componenets/Navbar';
import Slider from '../componenets/Slider';

export default function Home() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
    </div>
  );
}
