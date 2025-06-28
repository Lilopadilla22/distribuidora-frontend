import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showActions?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title = "Productos", 
  showActions = true 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-brown-600 mb-12">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              showActions={showActions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;