import React, { useEffect, useState } from 'react';
import { Users, Package, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchAllProducts, fetchAllOrders } from '../../services/apiAdmin';
import { formatPrice } from '../../utils/formatters';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [users, products, orders] = await Promise.all([
        fetchAllUsers(),
        fetchAllProducts(),
        fetchAllOrders(),
      ]);

      const totalSales = orders
        .filter(order => order.estado === 'entregado')
        .reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalSales,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Panel de control de Distrishulk</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/productos/nuevo"
            className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </Link>
          <Link
            to="/admin/categorias/nueva"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Categoría</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-blue-400">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-400">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Productos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-orange-400">
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-purple-400">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventas</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSales)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/productos"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-green-400"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestionar Productos</h3>
              <p className="text-gray-600">Ver, crear y editar productos</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </Link>

        <Link
          to="/admin/pedidos"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-orange-400"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestionar Pedidos</h3>
              <p className="text-gray-600">Ver y administrar todos los pedidos</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-orange-500" />
          </div>
        </Link>

        <Link
          to="/admin/usuarios"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-blue-400"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestionar Usuarios</h3>
              <p className="text-gray-600">Ver y administrar usuarios</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;