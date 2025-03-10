import { use, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './components/Login'; // Asegúrate de que la ruta sea correcta
import Navbar from './components/Navbar'; // Importa el componente Navbar
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Importa Navigate
import { AuthProvider } from './host/useAuth';
import { useAuth } from './host/useAuth';

function App() {
  return (
    <BrowserRouter>
      {/* Agrega el componente Navbar */}
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login mail={"roberto.ayala@softtek.com"} />}
          />
          <Route
            path='/Navbar'
            element={<Navbar />}
          />
          <Route
            path="/"
            element={<Navigate to="/login" />} // Redirige a /login
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;