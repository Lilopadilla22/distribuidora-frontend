import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { fetchProductById } from '../../services/api';
import { useOrderStore } from '../../context/useOrderStore';
import { formatPrice } from '../../utils/formatters';
import type { Product } from '../../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<'kilo' | 'unidad'>('kilo');
  const [loading, setLoading] = useState(true);
  const { addItem } = useOrderStore();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
        setSelectedUnit(productData.unidad);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToOrder = () => {
    if (!product) return;
    addItem(product, quantity, selectedUnit);
    // Opcional: mostrar notificación de éxito
  };

  const getPrice = () => {
    if (!product) return 0;
    return selectedUnit === 'kilo' ? product.precio_por_kilo : product.precio_por_unidad;
  };

  const getImageUrl = () => {
    if (!product) return '';
    const categoryName = product.categoria.nombre.toLowerCase();
    if (categoryName.includes('pollo')) {
      return 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else if (categoryName.includes('cerdo')) {
      return 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800';
    } else {
      return 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Producto no encontrado</p>
          <button 
            onClick={() => navigate('/productos')}
            className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition-colors"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/productos')}
          className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a productos
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img 
              src={getImageUrl()} 
              alt={product.nombre} 
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-brown-600 mb-2">{product.nombre}</h1>
              <p className="text-gray-600 mb-4">{product.categoria.nombre}</p>
              {product.recomendado && (
                <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Producto Recomendado
                </span>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-orange-400">
              <div className="mb-4">
                <p className="text-4xl font-bold text-green-600 mb-2">
                  {formatPrice(getPrice())} / {selectedUnit}
                </p>
                <p className={`text-sm font-medium ${product.disponible ? 'text-green-600' : 'text-red-600'}`}>
                  {product.disponible ? '✓ En stock' : '✗ Agotado'}
                </p>
              </div>

              {/* Unit Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unidad de venta:
                </label>
                <div className="flex space-x-2">
                  {product.precio_por_kilo > 0 && (
                    <button
                      onClick={() => setSelectedUnit('kilo')}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedUnit === 'kilo'
                          ? 'bg-orange-400 text-white border-orange-400'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                      }`}
                    >
                      Por Kilo - {formatPrice(product.precio_por_kilo)}
                    </button>
                  )}
                  {product.precio_por_unidad > 0 && (
                    <button
                      onClick={() => setSelectedUnit('unidad')}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedUnit === 'unidad'
                          ? 'bg-orange-400 text-white border-orange-400'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                      }`}
                    >
                      Por Unidad - {formatPrice(product.precio_por_unidad)}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad:
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-2xl font-bold text-green-600 mb-4">
                  Total: {formatPrice(getPrice() * quantity)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-brown-600 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{product.descripcion}</p>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleAddToOrder}
                disabled={!product.disponible}
                className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-red-400 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar al Pedido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;