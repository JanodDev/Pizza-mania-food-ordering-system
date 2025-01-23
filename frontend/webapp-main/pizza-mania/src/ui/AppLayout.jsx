import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Menu from '../pages/Category';

import Footer from './Footer';
import NavBar from './NavBar';
import HeroSlider from './Slider';
import FeaturesSection from './FeaturesSection';
import Aboutfood from './Aboutfood';
import Ceo from './Ceo';
import FoodGrid from './Foodgrid';
import Delivery from './Dilivery';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="h-screen">
      <NavBar></NavBar>
      <HeroSlider></HeroSlider>
      <main>
        <Outlet></Outlet>
      </main>
      <FeaturesSection></FeaturesSection>
      <Aboutfood></Aboutfood>
      <Ceo></Ceo>
      <Delivery></Delivery>
      <FoodGrid></FoodGrid>
      <Footer></Footer>
    </div>
  );
}
