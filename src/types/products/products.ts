export interface Category {
  _id: string;
  nombre: string;
    slug?: string;
}

export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: Category;
  precio_por_kilo: number;
  precio_por_unidad: number;
  unidad: string;
  disponible: boolean;
  recomendado: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}