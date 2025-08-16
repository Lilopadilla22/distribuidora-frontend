import React, { useEffect, useState } from 'react';
import { Package, User, Calendar } from 'lucide-react';
import { fetchAllOrders, updateOrderStatus } from '../../services/apiAdmin';
import { formatPrice, formatDateTime } from '../../utils/formatters';
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  type OrderStatus,
} from '../../utils/constants';
import type { AdminOrder } from '../../types';

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await fetchAllOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValidStatus = (value: string): value is OrderStatus => {
    return Object.values(ORDER_STATUS).includes(value as OrderStatus);
  };

  const handleStatusChange = async (orderId: string, newStatusRaw: string) => {
  if (!isValidStatus(newStatusRaw)) {
    console.warn(`Estado inválido: ${newStatusRaw}`);
    return;
  }

  const newStatus: OrderStatus = newStatusRaw;

  try {
    await updateOrderStatus(orderId, newStatus);

    const updatedOrders: AdminOrder[] = orders.map((order) =>
      order._id === orderId ? { ...order, estado: newStatus } : order
    );

    setOrders(updatedOrders);
  } catch (error) {
    console.error('Error updating order status:', error);
    alert('No se pudo actualizar el estado del pedido');
  }
};
  const filteredOrders =
    filter === 'all' ? orders : orders.filter((order) => order.estado === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PENDIENTE:
        return '⏳';
      case ORDER_STATUS.ENTREGADO:
        return '✅';
      case ORDER_STATUS.CANCELADO:
        return '❌';
      case ORDER_STATUS.ENCAMINO:
        return '🚐';
      default:
        return '📦';
    }
  };

  const getAvailableTransitions = (estado: string): string[] => {
    switch (estado) {
      case ORDER_STATUS.PENDIENTE:
        return [ORDER_STATUS.ENCAMINO, ORDER_STATUS.CANCELADO];
      case ORDER_STATUS.ENCAMINO:
        return [ORDER_STATUS.ENTREGADO];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <div className="text-sm text-gray-600">
          Total: {filteredOrders.length} pedidos
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex flex-wrap gap-2">
          {(['all', ...Object.values(ORDER_STATUS)] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === status
                  ? 'bg-orange-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? `Todos (${orders.length})`
                : `${ORDER_STATUS_LABELS[status]} (${
                    orders.filter((o) => o.estado === status).length
                  })`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Pedido #{order._id.slice(-8)}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>
                      {order.usuario.nombre} ({order.usuario.email})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDateTime(order.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.estado]}`}
                >
                  <span className="mr-1">{getStatusIcon(order.estado)}</span>
                  {ORDER_STATUS_LABELS[order.estado]}
                </span>
                <div className="text-2xl font-bold text-green-600 mt-2">
                  {formatPrice(order.total)}
                </div>

                {/* Estado Select */}
                {getAvailableTransitions(order.estado).length > 0 && (
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="mt-2 block w-full border border-gray-300 rounded-md text-sm px-2 py-1"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Actualizar estado...
                    </option>
                    {getAvailableTransitions(order.estado).map((option) => (
                      <option key={option} value={option}>
                        {ORDER_STATUS_LABELS[option as OrderStatus]}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Productos:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {order.productos.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-sm">
                        {item.producto.nombre}
                      </span>
                      <span className="text-gray-600 text-xs ml-2">
                        {item.cantidad} {item.unidad}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      {formatPrice(
                        (item.unidad === 'kilo'
                          ? item.producto.precio_por_kilo
                          : item.producto.precio_por_unidad) * item.cantidad
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay pedidos{' '}
            {filter !== 'all'
              ? `con estado "${ORDER_STATUS_LABELS[filter]}"`
              : ''}
          </h3>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;

