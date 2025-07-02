import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home'; // Solo la página Home por ahora
import Header from './components/Header/Header';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import Login from './pages/LoginView/Login';
import Checkout from './pages/Checkout';
import Comments from './pages/Comments';
import Orders from './pages/Orders/Orders';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import './App.css';

const FallingPetals = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = Math.random() * 3 + 5 + 's';
      document.querySelector('.falling-petals').appendChild(petal);
      
      setTimeout(() => {
        petal.remove();
      }, 8000);
    };

    const interval = setInterval(() => {
      createPetal();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="falling-petals"></div>;
};

const App = () => {
  return (
    <Router>
      <FallingPetals />
      <Routes>
        {/* Usamos el Layout para envolver todas las rutas */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/product/:id" 
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/comments" 
            element={
              <PrivateRoute>
                <Comments />
              </PrivateRoute>
            } 
          />

        </Route>

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
