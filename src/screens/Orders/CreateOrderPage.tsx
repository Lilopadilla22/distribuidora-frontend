import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useOrderStore } from '../../context/useOrderStore';
import { createOrder } from '../../services/api';
import { formatPrice } from '../../utils/formatters';
import type { OrderProductItem } from '../../types';

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearOrder, total } = useOrderStore();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCreateOrder = async () => {
    if (items.length === 0) {
      alert('No hay productos en el pedido');
      return;
    }

    setLoading(true);
    try {
      // Convertir items del store al formato de la API
      const productos: OrderProductItem[] = items.map(item => ({
        producto: item.product._id,
        cantidad: item.quantity,
        unidad: item.unit
      }));

      await createOrder({ productos });
      
      // Limpiar el pedido y redirigir
      clearOrder();
      alert('¡Pedido creado exitosamente!');
      navigate('/pedidos');
    } catch (error: any) {
      console.error('Error creating order:', error);
      alert(error.response?.data?.message || 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => navigate('/productos')}
            className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a productos
          </button>

          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tu pedido está vacío</h3>
            <p className="text-gray-500 mb-6">Agrega productos para crear tu pedido</p>
            <button
              onClick={() => navigate('/productos')}
              className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors font-semibold"
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/productos')}
          className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Seguir comprando
        </button>

        <div className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-6">
            <h1 className="text-2xl font-bold">Confirmar Pedido</h1>
            <p className="text-orange-100">Revisa los productos antes de confirmar</p>
          </div>

          <div className="p-6">
            {/* Lista de productos */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product._id}-${item.unit}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.product.nombre}</h3>
                    <p className="text-gray-600 text-sm">{item.product.categoria.nombre}</p>
                    <p className="text-green-600 font-medium">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Control de cantidad */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[100px]">
                      <p className="font-bold text-green-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-green-600">
                    Total: {formatPrice(total)}
                  </h3>
                  <p className="text-gray-600">
                    {items.length} producto{items.length > 1 ? 's' : ''} • {items.reduce((sum, item) => sum + item.quantity, 0)} unidades
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => clearOrder()}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Limpiar Pedido
                  </button>
                  <button
                    onClick={handleCreateOrder}
                    disabled={loading}
                    className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creando Pedido...' : 'Confirmar Pedido'}
                  </button>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Información importante:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Tienes 1 hora para cancelar tu pedido después de confirmarlo</li>
                  <li>• Los precios pueden variar según disponibilidad</li>
                  <li>• Recibirás una confirmación una vez procesado el pedido</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;