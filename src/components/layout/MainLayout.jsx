// src/components/layout/MainLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This renders the nested routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;