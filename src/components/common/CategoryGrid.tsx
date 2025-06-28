import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../../types';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'pollo':
        return '🐔';
      case 'cerdo':
        return '🐷';
      case 'carnes frias':
        return '🥓';
      default:
        return '🍖';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-brown-600 mb-12">
          Nuestras Categorías
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/productos?categoria=${category._id}`}
              className="text-center group cursor-pointer"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {getCategoryIcon(category.nombre)}
              </div>
              <h3 className="text-xl font-semibold text-brown-600 group-hover:text-orange-500 transition-colors">
                {category.nombre}
              </h3>
              <p className="text-gray-600 mt-2">{category.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;