import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import env from 'react-dotenv';
import axios from 'axios';
import './../style/LoginComponent.css'; // Assurez-vous d'importer le même style que LoginComponent

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(env.REACT_APP_API_URL+'/user', { email, password });
      console.log('Réponse du serveur:', response.data);
      // Redirection vers une autre page après une inscription réussie
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="bg-purple-200 p-8 rounded-lg w-80 mx-auto">
      <h2 className="text-lg font-bold mb-4">Inscription</h2>
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
        <button type="submit" className="bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-800 transition duration-300">S'inscrire</button>
      </form>
      <p className="mt-4">Déjà inscrit ? <Link to="/login" className="text-slate-900 hover:underline">Se connecter</Link></p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default RegisterComponent;
