// Constantes de la aplicación
export const ORDER_STATUS = {
  PENDIENTE: 'pendiente',
  CANCELADO: 'cancelado',
  ENTREGADO: 'entregado',
  ENCAMINO: 'en camino'
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDIENTE]: 'Pendiente',
  [ORDER_STATUS.CANCELADO]: 'Cancelado',
  [ORDER_STATUS.ENTREGADO]: 'Entregado',
  [ORDER_STATUS.ENCAMINO]: 'En camino',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDIENTE]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.CANCELADO]: 'bg-red-100 text-red-800',
  [ORDER_STATUS.ENTREGADO]: 'bg-green-100 text-green-800',
  [ORDER_STATUS.ENCAMINO]: 'bg-blue-100 text-blue-800',
};

export const PRODUCT_UNITS = {
  KILO: 'kilo',
  UNIDAD: 'unidad',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];