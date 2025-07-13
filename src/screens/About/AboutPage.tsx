import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Users, Award, Truck, Clock, GraduationCap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/perfil')}
          className="flex items-center text-white hover:text-orange-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al perfil
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Principal */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">D</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">DISTRISHULK</h1>
              <p className="text-2xl text-orange-100 mb-2">Distribuidora de Carnes Premium</p>
              <p className="text-lg text-orange-200">Calidad, Frescura y Confianza desde 2020</p>
            </div>
          </div>

          <div className="p-8">
            {/* Sección Principal */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Objetivo */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-b-4 border-blue-400">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800">OBJETIVO</h2>
                </div>
                <p className="text-blue-700 leading-relaxed text-lg">
                  Distrishulk es una distribuidora especializada en carnes premium que busca
                  revolucionar la experiencia de compra de productos cárnicos, ofreciendo
                  calidad excepcional, frescura garantizada y un servicio personalizado
                  para restaurantes, carnicerías y consumidores finales.
                </p>
              </div>

              {/* Impacto */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-b-4 border-green-400">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">IMPACTO</h2>
                </div>
                <p className="text-green-700 leading-relaxed text-lg">
                  Transformamos la cadena de suministro de carnes al digitalizar procesos,
                  garantizar trazabilidad completa y ofrecer entregas rápidas y seguras.
                  Conectamos productores locales con consumidores, promoviendo la economía
                  regional y la sostenibilidad.
                </p>
              </div>
            </div>

            {/* Funcionalidades */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-b-4 border-purple-400 mb-12">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-purple-800">SERVICIOS</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🐔</span>
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Pollo Premium</h3>
                  <p className="text-purple-600 text-sm">Pollo fresco de granjas certificadas</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🐷</span>
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Cerdo Selecto</h3>
                  <p className="text-purple-600 text-sm">Cortes especiales de cerdo</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🥓</span>
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Carnes Frías</h3>
                  <p className="text-purple-600 text-sm">Embutidos y productos procesados</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Entrega Rápida</h3>
                  <p className="text-purple-600 text-sm">Pedidos en línea con entrega garantizada</p>
                </div>
              </div>
            </div>

            {/* Tecnologías */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-b-4 border-gray-400 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">TECNOLOGÍAS UTILIZADAS</h2>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center font-medium">
                  React
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium">
                  TypeScript
                </div>
                <div className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-center font-medium">
                  Tailwind CSS
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center font-medium">
                  Node.js
                </div>
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-center font-medium">
                  MongoDB
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center font-medium">
                  REST API
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-orange-50 rounded-2xl p-6 border-b-4 border-orange-400">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-bold text-orange-800 mb-2">UBICACIÓN</h3>
                <p className="text-orange-700">Bogotá, Colombia</p>
                <p className="text-orange-600 text-sm">Zona Industrial Norte</p>
              </div>

              <div className="text-center bg-blue-50 rounded-2xl p-6 border-b-4 border-blue-400">
                <Phone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-blue-800 mb-2">TELÉFONO</h3>
                <p className="text-blue-700">+57 300 123 4567</p>
                <p className="text-blue-600 text-sm">Lun - Vie: 6:00 AM - 6:00 PM</p>
              </div>

              <div className="text-center bg-green-50 rounded-2xl p-6 border-b-4 border-green-400">
                <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-green-800 mb-2">EMAIL</h3>
                <p className="text-green-700">info@distrishulk.com</p>
                <p className="text-green-600 text-sm">Respuesta en 24 horas</p>
              </div>
            </div>

            {/* Sección del Equipo y SENA */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-b-4 border-green-400">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brown-600 mb-4">NUESTRO EQUIPO</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Desarrollado por Lilia Padilla
                </p>
              </div>

              {/* Información del SENA */}
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-center mb-6">
                  {/* Logo del SENA usando SVG */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-green-700">SENA</h3>
                      <p className="text-green-600 text-sm">Servicio Nacional de Aprendizaje</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    Proyecto desarrollado como parte de la formación en <strong>Análisis y Desarrollo de Software</strong>
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <strong className="text-green-700">Institución:</strong><br />
                      Servicio Nacional de Aprendizaje - SENA
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <strong className="text-blue-700">Programa:</strong><br />
                      Tecnólogo en Análisis y Desarrollo de Software
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      "Formación para el trabajo y el desarrollo humano integral"
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      El SENA es la institución pública que ofrece formación gratuita a millones de colombianos
                    </p>
                  </div>
                </div>
              </div>

              {/* Información técnica */}
              <div className="mt-8 text-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Stack Tecnológico del Proyecto</h4>
                <div className="flex justify-center space-x-8 text-sm text-gray-500 flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Frontend: React + TypeScript</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Backend: Node.js + MongoDB</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Diseño: Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;