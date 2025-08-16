import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/common/AdminHeader';
import useAuthCheck from '../hook/useAuthCheck';

const AdminLayout: React.FC = () => {
    useAuthCheck()
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
