import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, DollarSign, Tag, FileText } from 'lucide-react';
import { fetchAllCategories, createProduct } from '../../services/apiAdmin';
import type { Category, CreateProductData } from '../../types';
import axios from 'axios'

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState<CreateProductData>({
    nombre: '',
    descripcion: '',
    precio_por_kilo: 0,
    precio_por_unidad: 0,
    unidad: 'kilo',
    categoria: '',
    recomendado: false,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.categoria) {
    alert('Por favor selecciona una categoría');
    return;
  }

  if (formData.precio_por_kilo === 0 && formData.precio_por_unidad === 0) {
    alert('Debe tener al menos un precio (por kilo o por unidad)');
    return;
  }

  setLoading(true);
  try {
    await createProduct(formData);
    alert('Producto creado exitosamente');
    navigate('/admin/productos');
  } catch (error: unknown) {
    console.error('Error creating product:', error);

    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Error al crear el producto');
    } else {
      alert('Error inesperado al crear el producto');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/admin/productos')}
        className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a productos
      </button>

      <div className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="w-6 h-6 mr-3" />
            Crear Nuevo Producto
          </h1>
          <p className="text-orange-100">Completa la información del producto</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Información Básica</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
                  Nombre del Producto *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Ej: Pechuga de Pollo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="descripcion">
                  Descripción *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="descripcion"
                    required
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Descripción detallada del producto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="categoria">
                  Categoría *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="categoria"
                    required
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    disabled={loadingCategories}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {loadingCategories && (
                  <p className="text-sm text-gray-500 mt-1">Cargando categorías...</p>
                )}
              </div>
            </div>

            {/* Precios y configuración */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Precios y Configuración</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="precio_por_kilo">
                  Precio por Kilo
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="precio_por_kilo"
                    min="0"
                    step="100"
                    value={formData.precio_por_kilo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="precio_por_unidad">
                  Precio por Unidad
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="precio_por_unidad"
                    min="0"
                    step="100"
                    value={formData.precio_por_unidad}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="unidad">
                  Unidad Principal *
                </label>
                <select
                  name="unidad"
                  required
                  value={formData.unidad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                >
                  <option value="kilo">Kilo</option>
                  <option value="unidad">Unidad</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recomendado"
                  name="recomendado"
                  checked={formData.recomendado}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
                />
                <label htmlFor="recomendado" className="text-sm font-medium text-gray-700">
                  Producto Recomendado
                </label>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/productos')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;