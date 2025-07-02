// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer'; // Importamos el Footer
import './Home.css';
import heroImage from '../../assets/imagen.png'; // Importamos la imagen correctamente
import Categories from '../../components/Categories/Categories'; // Importamos el componente de categorías
import Product from '../../components/Product/Product'; // Importamos el componente de productos
import productService from '../../services/productService';
import { Link } from 'react-router-dom';

const FallingPetals = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.querySelector('.falling-petals-container').appendChild(petal);
      
      setTimeout(() => {
        petal.remove();
      }, 5000);
    };

    const interval = setInterval(() => {
      createPetal();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <div className="falling-petals-container"></div>;
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        console.log("Productos recibidos:", data); // Para ver la estructura exacta
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <FallingPetals />
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-text">
          <h1 className="hero-title">Bienvenidos a Lunette</h1>
          <p className="hero-subtitle">Cada joya, una historia que contar</p>
        </div>
        <div className="home-content">
          <p className="home-description">
            "Cada detalle refleja tu elegancia y estilo. Las joyas de Lunette capturan la magia de tus momentos más especiales."
          </p>
        </div>
      </div>

      <div className="home-categories">
        <Categories /> {/* Aquí incluimos el componente de categorías */}
      </div>

      {/* Mostrar los 3 productos más baratos arriba */}
      <h2 className="product-title">Productos</h2>
      <h2 className="product-subtitle">Los productos más vendidos</h2>
      <div className="product-list">
        {products.slice(0, 3).map(product => (
          <Product 
            key={product._id}
            productId={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>

      <div className="shipping-info">
        <p>Obtén envío nacional gratis por compras de más de S/ 251.00. Aplican condiciones.</p>
      </div>

      {/* Mostrar todos los productos abajo */}
      
      <h2 className="product-subtitle">Todos los productos</h2>
      <div className="product-list">
        {products.map(product => (
          <Product 
            key={product._id}
            productId={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
      
      <Footer /> {/* Insertamos el Footer al final de la página */}
    </div>
  );
};

export default Home;  // Exportación por defecto
