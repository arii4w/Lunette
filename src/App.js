import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Solo la página Home por ahora
import Header from './components/Header/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Comments from './pages/Comments';
import Orders from './pages/Orders';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/comments" element={<Comments />} /> 
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
