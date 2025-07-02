import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://20.169.245.239:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password_hash: password 
        }),
      });
  
      const data = await response.json();
      
      console.log('Respuesta del login:', data); // Agregado
  
      if (response.ok) {
        logIn(data); // Guardamos toda la información del usuario
        navigate('/home');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Error de conexión. Por favor, intenta más tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="split-container">
      <div className="form-side">
        <div className="login-form">
          <h2>¡Bienvenido de vuelta!</h2>
          <p className="subtitle">Ingresa tus credenciales para continuar</p>
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="btn-cta"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="form-footer">
            <p>¿No tienes cuenta? <Link to="/register" className="link">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
      <div className="image-side"></div>
    </div>
  );
};

export default Login;
