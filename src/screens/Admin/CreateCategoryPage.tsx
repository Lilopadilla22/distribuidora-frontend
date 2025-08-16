import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, FileText } from 'lucide-react';
import { createCategory } from '../../services/apiAdmin';
import type { CreateCategoryData } from '../../types';
import axios from 'axios';

const CreateCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCategoryData>({
    nombre: '',
    descripcion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await createCategory(formData);
    alert('Categoría creada exitosamente');
    navigate('/admin');
  } catch (error: unknown) {
    console.error('Error creating category:', error);

    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Error al crear la categoría');
    } else {
      alert('Error inesperado al crear la categoría');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/admin')}
        className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver al dashboard
      </button>

      <div className="bg-white rounded-xl shadow-md border-b-4 border-blue-400 overflow-hidden max-w-2xl">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Tag className="w-6 h-6 mr-3" />
            Crear Nueva Categoría
          </h1>
          <p className="text-blue-100">Agrega una nueva categoría de productos</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
              Nombre de la Categoría *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Ej: Pollo, Cerdo, Carnes Frías"
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
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Descripción de la categoría"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;