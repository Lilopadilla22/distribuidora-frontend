import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const ClientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
