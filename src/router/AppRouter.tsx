import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

// Layouts
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';

// Auth Pages
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

// Client Pages
import Home from '../screens/Home/Home';
import ProductListPage from '../screens/Products/ProductListPage';
import ProductDetailPage from '../screens/Products/ProductDetailPage';
import OrdersPage from '../screens/Orders/OrdersPage';
import OrderDetailPage from '../screens/Orders/OrderDetailPage';
import CreateOrderPage from '../screens/Orders/CreateOrderPage';
import ProfilePage from '../screens/profile/ProfilePage';
import AboutPage from '../screens/About/AboutPage';

// Admin Pages
import AdminDashboard from '../screens/Admin/AdminDashboard';
import AdminProductsPage from '../screens/Admin/AdminProductsPage';
import AdminOrdersPage from '../screens/Admin/AdminOrdersPage';
import AdminUsersPage from '../screens/Admin/AdminUsersPage';
import CreateProductPage from '../screens/Admin/CreateProductPage';
import CreateCategoryPage from '../screens/Admin/CreateCategoryPage';

const AppRouter = () => {
  const { user } = useAuthStore();


  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  let fallbackPath = '/login';
  if (user) {
    fallbackPath = isAdmin ? '/admin' : '/';
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={fallbackPath} replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={fallbackPath} replace />}
        />

        {/* Admin Protected Routes */}
        {isAdmin && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="productos" element={<AdminProductsPage />} />
            <Route path="productos/nuevo" element={<CreateProductPage />} />
            <Route path="categorias/nueva" element={<CreateCategoryPage />} />
            <Route path="pedidos" element={<AdminOrdersPage />} />
            <Route path="usuarios" element={<AdminUsersPage />} />
          </Route>
        )}

        {/* Client Protected Routes */}
        {isClient && (
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductListPage />} />
            <Route path="producto/:id" element={<ProductDetailPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="pedido/:id" element={<OrderDetailPage />} />
            <Route path="pedido" element={<CreateOrderPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="acerca-de" element={<AboutPage />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to={fallbackPath} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
