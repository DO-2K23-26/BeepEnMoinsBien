import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LoginComponent from '../components/LoginComponant';

function App() {
  const token = localStorage.getItem('accessToken');
  const isAuth = token ? true : false;
  
  return (
    <Router>
      <Routes>
        {/* Si le token existe dans le localStorage, affichez la Sidebar */}
        {isAuth ? (
          <Route path="/" element={<Sidebar />} />
        ) : (
          // Si le token n'existe pas, redirigez l'utilisateur vers la page de connexion
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        {/* Toujours afficher la page de connexion */}
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
