// Constantes de la aplicación
export const ORDER_STATUS = {
  PENDIENTE: 'pendiente',
  CANCELADO: 'cancelado',
  ENTREGADO: 'entregado',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDIENTE]: 'Pendiente',
  [ORDER_STATUS.CANCELADO]: 'Cancelado',
  [ORDER_STATUS.ENTREGADO]: 'Entregado',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDIENTE]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.CANCELADO]: 'bg-red-100 text-red-800',
  [ORDER_STATUS.ENTREGADO]: 'bg-green-100 text-green-800',
};

export const PRODUCT_UNITS = {
  KILO: 'kilo',
  UNIDAD: 'unidad',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;