import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Importa el archivo CSS de estilos

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://20.169.245.239:5000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username: `${nombre}${apellido}`,
          password_hash: password,
          is_verified: true,
          addresses: [],
          cards: []
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); // Redirige al login después de registrarse
      } else {
        setError(data.message || 'Error al registrar.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Error de conexión. Por favor, intenta más tarde.');
    }
  };

  return (
    <div className="split-container">
      <div className="image-side"></div>
      <div className="form-side">
        <div className="register-form">
          <h2>¡Bienvenido a Lunette! Crea tu cuenta</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" name="nombre" required className="input" onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" name="apellido" required className="input" onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" required className="input" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" required className="input" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-cta" disabled={isLoading}>
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>
          <p className="form-footer">
            ¿Ya tienes cuenta? <Link to="/login" className="link">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
