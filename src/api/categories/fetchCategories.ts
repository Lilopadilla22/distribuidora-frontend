export interface Category {
  _id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slug?: string; 
}


export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('http://localhost:3100/api/categorias');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: Category[] = await response.json();
    
    return data.map(category => ({
      ...category,
      slug: category.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9\s]/g, '') 
        .replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};