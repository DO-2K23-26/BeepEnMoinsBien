import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_url } from '../context/envar';
import { useUserContext } from '../context/authcontext';

const LoginComponent = () => {

  const { setToken } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const url = useContext(api_url);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + '/auth/login', { email, password });
      if (response.status === 200) {
        setToken(response.data.accessToken, response.data.refreshToken);
        window.location.reload();
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      setError('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-purple-200 p-8 rounded-lg w-80 mx-auto">
        <h2 className="text-lg font-bold mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-slate-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-slate-900"
            />
          </div>
          <button type="submit" className="bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-800 transition duration-300">Se connecter</button>
        </form>
        <p className="mt-4">Pas encore inscrit ? <Link to="/register" className="text-slate-900 hover:underline">S'inscrire</Link></p>
        {error && <p className="text-red-500 mt-2">{error}</p>}

      </div>
    </div>
  );
};

export default LoginComponent;
