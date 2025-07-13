import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-600">Bienvenido al panel de administración de Distrishulk</p>
      </div>

      {/* Placeholder cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-blue-400">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">---</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-400">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Productos</p>
              <p className="text-2xl font-bold text-gray-900">---</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-orange-400">
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">---</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-purple-400">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventas</p>
              <p className="text-2xl font-bold text-gray-900">---</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos Recientes</h3>
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Panel de pedidos en desarrollo</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Populares</h3>
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Estadísticas de productos en desarrollo</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-yellow-800 font-bold">!</span>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Panel en Desarrollo</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Este es un placeholder del panel administrativo. Las funcionalidades completas 
                de administración se implementarán próximamente, incluyendo:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Gestión de productos y categorías</li>
                <li>Administración de pedidos</li>
                <li>Gestión de usuarios</li>
                <li>Reportes y estadísticas</li>
                <li>Configuración del sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;