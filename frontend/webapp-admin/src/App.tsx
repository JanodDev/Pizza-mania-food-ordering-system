import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from '@/components/AppLayout';
import Dashboard from '@/features/dashboard/Dashboard';
import Items from './pages/Items';
import Orders from './pages/Orders';
import AddItemForm from './features/items/AddItemForm';
import ViewItemDetails from './features/items/ViewItemDetails';
import { ThemeProvider } from './components/theme-provider';
import OrderDetailsView from './features/orders/OrderDetailsView';
import LoginForm from './features/authentication/LoginForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<LoginForm></LoginForm>}></Route>
              <Route element={<AppLayout></AppLayout>}>
                <Route
                  index
                  element={<Navigate replace to="dashboard"></Navigate>}
                ></Route>
                <Route
                  path="dashboard"
                  element={<Dashboard></Dashboard>}
                ></Route>
                <Route path="items" element={<Items></Items>}></Route>
                <Route
                  path="items/:itemId"
                  element={<ViewItemDetails></ViewItemDetails>}
                ></Route>
                <Route path="orders" element={<Orders></Orders>}></Route>
                <Route
                  path="orders/:orderId"
                  element={<OrderDetailsView></OrderDetailsView>}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
