import React from 'react';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import ShoppingCart from '../ui/ShoppingCartStripeUpdated';

export default function Cart() {
  return (
    <>
      <NavBar></NavBar>
      <ShoppingCart></ShoppingCart>
      <Footer></Footer>
    </>
  );
}
