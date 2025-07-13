import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar, CreditCard, Edit, Save, X, Info } from 'lucide-react';
import { fetchUserProfile } from '../../services/api';
import { useAuthStore } from '../../context/useAuthStore';
import { formatDate } from '../../utils/formatters';
import type { UserProfile } from '../../types';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { updateUser } = useAuthStore();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await fetchUserProfile();

      setProfile(profileData);
      updateUser(profileData.user);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    // TODO: Implementar actualización de perfil cuando esté disponible la API
    setEditing(false);
    alert('Funcionalidad de edición en desarrollo');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Error al cargar perfil</h3>
          <p className="text-gray-500">No se pudo obtener la información del usuario</p>
        </div>
      </div>
    );
  }

  const { user } = profile;

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md border-b-4 border-orange-400 overflow-hidden">
          {/* Header del perfil */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {user.nombre} {user.apellido || ''}
                  </h1>
                  <p className="text-orange-100">{user.email}</p>
                  <div className="flex items-center mt-2">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {!editing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Información personal */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-brown-600 mb-4">Información Personal</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Nombre completo</p>
                      <p className="font-medium">
                        {user.nombre} {user.apellido || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Correo electrónico</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  {user.telefono && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Teléfono</p>
                        <p className="font-medium">{user.telefono}</p>
                      </div>
                    </div>
                  )}

                  {user.cc && (
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Cédula</p>
                        <p className="font-medium">{user.cc}</p>
                      </div>
                    </div>
                  )}

                  {user.fecha_cumpleanos && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Fecha de nacimiento</p>
                        <p className="font-medium">{formatDate(user.fecha_cumpleanos)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-brown-600 mb-4">Información de Negocio</h2>
                <div className="space-y-4">
                  {user.nombre_negocio && (
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Nombre del negocio</p>
                        <p className="font-medium">{user.nombre_negocio}</p>
                      </div>
                    </div>
                  )}

                  {user.empresa && (
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Empresa</p>
                        <p className="font-medium">{user.empresa}</p>
                      </div>
                    </div>
                  )}

                  {user.direccion && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Dirección</p>
                        <p className="font-medium">{user.direccion}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Información de cuenta */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-brown-600 mb-4">Información de Cuenta</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Miembro desde</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última actualización</p>
                  <p className="font-medium">{formatDate(user.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID de usuario</p>
                  <p className="font-medium text-xs text-gray-500">{user._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de cuenta</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                    {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mensaje de desarrollo */}
            {editing && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-yellow-800 font-bold">!</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Funcionalidad en desarrollo</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        La edición de perfil está en desarrollo. Próximamente podrás actualizar tu información personal y de negocio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones adicionales */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-blue-400 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Mis Pedidos</h3>
            <p className="text-gray-600 text-sm mb-4">Ver historial de pedidos</p>
            <button
              onClick={() => window.location.href = '/pedidos'}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Ver Pedidos
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-400 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Productos</h3>
            <p className="text-gray-600 text-sm mb-4">Explorar catálogo</p>
            <button
              onClick={() => window.location.href = '/productos'}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Ver Productos
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-orange-400 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Nuevo Pedido</h3>
            <p className="text-gray-600 text-sm mb-4">Crear pedido rápido</p>
            <button
              onClick={() => window.location.href = '/pedido'}
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
            >
              Crear Pedido
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-purple-400 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Acerca de</h3>
            <p className="text-gray-600 text-sm mb-4">Información de Distrishulk</p>
            <Link
              to="/acerca-de"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors inline-flex items-center space-x-2"
            >
              <Info className="w-4 h-4" />
              <span>Ver Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;