import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../context/useAuthStore';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo + texto */}
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brown-600">Distrishulk Admin</h1>
              <p className="text-sm text-gray-600">Panel de Administración</p>
            </div>
          </Link>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-500 transition-colors space-x-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
