import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-orange-400 to-red-400 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Carnes Frescas
          <span className="block text-yellow-300">Directo a tu Mesa</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          La mejor calidad en pollo, cerdo y carnes frías. Distribución confiable para tu negocio.
        </p>
        <Link 
          to="/productos"
          className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-50 transition-all transform hover:scale-105"
        >
          Ver Productos
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;