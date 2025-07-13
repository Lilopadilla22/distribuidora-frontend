import React from 'react';
import { Plus } from 'lucide-react';
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
  const name = product.nombre.toLowerCase();

  if (name.includes('pechuga')) {
    return 'https://famipollo.com.co/wp-content/uploads/2020/05/pechuga1.png';
  } else if (name.includes('alita')) {
    return 'https://media.istockphoto.com/id/1130423940/es/foto/alitas-de-pollo-crudas.jpg?s=170667a&w=0&k=20&c=VCQ_iSktgktSnC2Qjvog_bB93vTPtBTiDaVthbTT0Os=';
  } else if (name.includes('chorizo')) {
    return 'https://premier.com.co/wp-content/uploads/2024/04/chorizo-antioqueno.webp';
  } else if (name.includes('butifarra')) {
    return 'https://alimentospromeat.com/wp-content/uploads/2020/10/Butifarras.jpg';
  } else if (name.includes('cerdo')) {
    return 'https://media.istockphoto.com/id/1200968915/es/foto/carne-de-cerdo-cruda-con-romero-y-grano-de-pimienta-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=S1_RpfxknBTgWB3U9VR_DgtYPIticsETfwSNtmiSIh4=';
  } else if (name.includes('pollo')) {
    return 'https://web.macpollo.com/app01/114.png';
  } 
   else {
    return 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'; 
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