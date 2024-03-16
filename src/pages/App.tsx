import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginComponent from '../components/LoginComponant';
import RegisterComponent from '../components/RegisterComposant';
import { ApiProvider, authContext } from '../context/envar';
import { SocketProvider } from '../context/socketcontext';
import Main from './Main';
import { useContext } from 'react';

function App() {
  console.log(useContext(authContext).isAuthenticated);
  return (
    <Router>
      <ApiProvider>
      <Routes>
        {useContext(authContext).isAuthenticated ? (
          <Route path="/" element={<Main />} />
        ) : (
          // Si le token n'existe pas, redirigez l'utilisateur vers la page de connexion
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        {/* Toujours afficher la page de connexion */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent/>} />
        <Route path="/viewProfil" element={<div>Profil</div>} />
      </Routes>
      </ApiProvider>
      
    </Router>
  );
}

export { App };