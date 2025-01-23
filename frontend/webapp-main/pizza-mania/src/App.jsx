import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AppLayout from './ui/AppLayout';
import Category from './pages/Category';
import MenuItems from './ui/menu/MenuItems';
import { CartProvider } from './context/CartContext';
import ShoppingCart from './ui/ShoppingCart';
import Cart from './pages/Cart';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout></AppLayout>}>
                <Route
                  index
                  element={<Navigate replace to="home"></Navigate>}
                ></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/category" element={<Category></Category>}></Route>
                <Route
                  path="/category/:type"
                  element={<MenuItems></MenuItems>}
                ></Route>
                <Route path="/contact" element={<Contact></Contact>}></Route>
              </Route>
              <Route path="/cart" element={<Cart></Cart>}></Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </CartProvider>
    </>
  );
}
