import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../../context/useAuthStore';
import { useOrderStore } from '../../context/useOrderStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { getItemCount } = useOrderStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b-4 border-orange-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brown-600">Distrishulk</h1>
              <p className="text-sm text-gray-600">Distribuidora de Carnes</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
              Inicio
            </Link>
            <Link to="/productos" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
              Productos
            </Link>
            <Link to="/pedidos" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
              Mis Pedidos
            </Link>
            <Link to="/perfil" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
              Perfil
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart/Order Icon */}
            <Link to="/pedido" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user && (
              <div className="hidden md:flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">{user.nombre}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              to="/pedidos" 
              className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mis Pedidos
            </Link>
            <Link 
              to="/perfil" 
              className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Perfil
            </Link>
            {user && (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;