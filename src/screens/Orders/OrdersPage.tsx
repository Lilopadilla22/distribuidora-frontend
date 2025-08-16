import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, AlertCircle, CheckCircle, XCircle, CarFrontIcon } from 'lucide-react';
import { fetchUserOrders, cancelOrder } from '../../services/api';
import { formatPrice, formatDateTime, formatTimeRemaining, canCancelOrder } from '../../utils/formatters';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants';
import type { Order } from '../../types';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await fetchUserOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      return;
    }

    setCancellingOrder(orderId);
    try {
      await cancelOrder(orderId);
      await loadOrders(); // Recargar pedidos
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al cancelar el pedido');
    } finally {
      setCancellingOrder(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="w-5 h-5" />;
      case 'entregado':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelado':
        return <XCircle className="w-5 h-5" />;
      case 'en camino':
        return <CarFrontIcon className="w-6 h-6" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brown-600">Mis Pedidos</h1>
          <Link
            to="/pedido"
            className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors font-semibold"
          >
            Nuevo Pedido
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes pedidos</h3>
            <p className="text-gray-500 mb-6">¡Haz tu primer pedido y disfruta de nuestros productos!</p>
            <Link
              to="/productos"
              className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors font-semibold"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-brown-600 mb-1">
                        Pedido #{order._id.slice(-8)}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.estado]}`}>
                        {getStatusIcon(order.estado)}
                        <span className="ml-2">{ORDER_STATUS_LABELS[order.estado]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Productos del pedido */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Productos:</h4>
                    <div className="space-y-2">
                      {order.productos.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <span className="font-medium">{item.producto.nombre}</span>
                            <span className="text-gray-600 ml-2">
                              {item.cantidad} {item.unidad}{item.cantidad > 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(
                              (item.unidad === 'kilo' ? item.producto.precio_por_kilo : item.producto.precio_por_unidad) * item.cantidad
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        Total: {formatPrice(order.total)}
                      </p>
                      {order.estado === 'pendiente' && (
                        <p className="text-sm text-gray-600 mt-1">
                          {canCancelOrder(order.hora_limite) ? (
                            <span className="flex items-center text-orange-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {formatTimeRemaining(order.hora_limite)} para cancelar
                            </span>
                          ) : (
                            <span className="text-red-600">Tiempo para cancelar agotado</span>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        to={`/pedido/${order._id}`}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Ver Detalle
                      </Link>
                      
                      {order.estado === 'pendiente' && canCancelOrder(order.hora_limite) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingOrder === order._id}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingOrder === order._id ? 'Cancelando...' : 'Cancelar'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;