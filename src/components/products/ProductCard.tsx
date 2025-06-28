import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useOrderStore } from '../../context/useOrderStore';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showActions = true }) => {
  const { addItem } = useOrderStore();

  const handleAddToOrder = () => {
    const defaultUnit = product.unidad;
    addItem(product, 1, defaultUnit);
  };

  const getPrice = () => {
    if (product.unidad === 'kilo') {
      return formatPrice(product.precio_por_kilo);
    }
    return formatPrice(product.precio_por_unidad);
  };

  const getImageUrl = () => {
    // Placeholder images based on category
    const categoryName = product.categoria.nombre.toLowerCase();
    if (categoryName.includes('pollo')) {
      return 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else if (categoryName.includes('cerdo')) {
      return 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else {
      return 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-b-4 border-orange-400 overflow-hidden group">
      <div className="relative">
        <img 
          src={getImageUrl()} 
          alt={product.nombre} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
        />
        {!product.disponible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Agotado
            </span>
          </div>
        )}
        {product.recomendado && (
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              Recomendado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-brown-600 mb-2">{product.nombre}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-600 font-bold text-lg">
              {getPrice()} / {product.unidad}
            </p>
            <p className="text-xs text-gray-500">{product.categoria.nombre}</p>
          </div>
          
          {showActions && (
            <div className="flex space-x-2">
              <Link 
                to={`/producto/${product._id}`}
                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleAddToOrder}
                disabled={!product.disponible}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;