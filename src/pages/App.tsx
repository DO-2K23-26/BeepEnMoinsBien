import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginComponent from '../components/LoginComponant';
import RegisterComponent from '../components/RegisterComposant';
import { ApiProvider } from '../context/envar';

function App() {
  const token = localStorage.getItem('accessToken');
  const isAuth = token ? true : false;
  
  return (
    <Router>
      <ApiProvider>
      <Routes>
        {/* Si le token existe dans le localStorage, affichez la Sidebar */}
        {isAuth ? (
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

export default App;