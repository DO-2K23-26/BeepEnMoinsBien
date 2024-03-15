import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../style/LoginComponent.css'

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        console.log('Email:', email);
        console.log('Mot de passe:', password);
      const response = await axios.post('http://localhost:9644/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Réponse du serveur:', response.data);
      // Redirection vers une autre page après une authentification réussie
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      setError('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Se connecter</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginComponent;
