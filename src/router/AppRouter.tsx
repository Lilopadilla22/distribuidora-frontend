import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Home/Home';
import ProductListPage from '../screens/Products/ProductListPage';
import ProductDetailPage from '../screens/Products/ProductDetailPage';
import OrdersPage from '../screens/Orders/OrdersPage';
import OrderDetailPage from '../screens/Orders/OrderDetailPage';
import CreateOrderPage from '../screens/Orders/CreateOrderPage';
import AdminDashboard from '../screens/Admin/AdminDashboard';
import ProfilePage from '../screens/profile/ProfilePage';


const AppRouter = () => {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />}
        />

        {/* Protected Routes */}
        {user && (
          <>
            {user.role === 'admin' && (
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                {/* TODO: Add more admin routes */}
                {/* <Route path="productos" element={<AdminProductsPage />} />
                <Route path="pedidos" element={<AdminOrdersPage />} />
                <Route path="usuarios" element={<AdminUsersPage />} /> */}
              </Route>
            )}
            {user.role === 'client' && (
              <Route path="/" element={<ClientLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<ProductListPage />} />
                <Route path="producto/:id" element={<ProductDetailPage />} />
                <Route path="pedidos" element={<OrdersPage />} />
                <Route path="pedido/:id" element={<OrderDetailPage />} />
                <Route path="pedido" element={<CreateOrderPage />} />

                <Route path="perfil" element={<ProfilePage />} />
              </Route>
            )}
          </>
        )}

        <Route 
          path="*" 
          element={
            <Navigate 
              to={
                user 
                  ? user.role === 'admin' 
                    ? '/admin' 
                    : '/' 
                  : '/login'
              } 
              replace 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;