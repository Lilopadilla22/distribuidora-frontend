import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, AlertCircle, CheckCircle, XCircle, CarFrontIcon } from 'lucide-react';
import { fetchUserOrders, cancelOrder } from '../../services/api';
import { formatPrice, formatDateTime, formatTimeRemaining, canCancelOrder } from '../../utils/formatters';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants';
import type { Order } from '../../types';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadOrderDetail();
  }, [id]);

  const loadOrderDetail = async () => {
    if (!id) return;
    
    try {
      const orders = await fetchUserOrders();
      const foundOrder = orders.find(order => order._id === id);
      setOrder(foundOrder || null);
    } catch (error) {
      console.error('Error loading order detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order || !confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      return;
    }

    setCancelling(true);
    try {
      await cancelOrder(order._id);
      await loadOrderDetail(); 
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al cancelar el pedido');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="w-6 h-6" />;
      case 'entregado':
        return <CheckCircle className="w-6 h-6" />;
      case 'cancelado':
        return <XCircle className="w-6 h-6" />;
      case 'en camino':
        return <CarFrontIcon className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalle del pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Pedido no encontrado</h3>
          <button 
            onClick={() => navigate('/pedidos')}
            className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition-colors"
          >
            Volver a mis pedidos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/pedidos')}
          className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a mis pedidos
        </button>

        <div className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 overflow-hidden">
          {/* Header del pedido */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Pedido #{order._id.slice(-8)}
                </h1>
                <p className="text-orange-100">
                  Realizado el {formatDateTime(order.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white ${ORDER_STATUS_COLORS[order.estado]}`}>
                  {getStatusIcon(order.estado)}
                  <span className="ml-2">{ORDER_STATUS_LABELS[order.estado]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Información del tiempo límite */}
            {order.estado === 'pendiente' && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      {canCancelOrder(order.hora_limite) ? 'Tiempo para cancelar' : 'Tiempo agotado'}
                    </p>
                    <p className="text-sm text-yellow-700">
                      {canCancelOrder(order.hora_limite) 
                        ? formatTimeRemaining(order.hora_limite)
                        : 'Ya no puedes cancelar este pedido'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Productos del pedido */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-brown-600 mb-4">Productos del Pedido</h2>
              <div className="space-y-4">
                {order.productos.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.producto.nombre}</h3>
                      <p className="text-gray-600">
                        Cantidad: {item.cantidad} {item.unidad}{item.cantidad > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        Precio unitario: {formatPrice(
                          item.unidad === 'kilo' ? item.producto.precio_por_kilo : item.producto.precio_por_unidad
                        )} / {item.unidad}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatPrice(
                          (item.unidad === 'kilo' ? item.producto.precio_por_kilo : item.producto.precio_por_unidad) * item.cantidad
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-green-600">
                    Total: {formatPrice(order.total)}
                  </h3>
                  <p className="text-gray-600">
                    {order.productos.length} producto{order.productos.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex space-x-3">
                  {order.estado === 'pendiente' && canCancelOrder(order.hora_limite) && (
                    <button
                      onClick={handleCancelOrder}
                      disabled={cancelling}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancelling ? 'Cancelando...' : 'Cancelar Pedido'}
                    </button>
                  )}
                </div>
              </div>

              {/* Información adicional */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Información del Pedido</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">ID:</span> {order._id}</p>
                    <p><span className="font-medium">Estado:</span> {ORDER_STATUS_LABELS[order.estado]}</p>
                    <p><span className="font-medium">Fecha:</span> {formatDateTime(order.createdAt)}</p>
                    {order.updatedAt !== order.createdAt && (
                      <p><span className="font-medium">Última actualización:</span> {formatDateTime(order.updatedAt)}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Tiempo Límite</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Límite para cancelar:</span> {formatDateTime(order.hora_limite)}</p>
                    <p className={`font-medium ${canCancelOrder(order.hora_limite) ? 'text-orange-600' : 'text-red-600'}`}>
                      {canCancelOrder(order.hora_limite) ? formatTimeRemaining(order.hora_limite) : 'Tiempo agotado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;