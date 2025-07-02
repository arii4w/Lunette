// src/pages/Home.js
import React from 'react';
import Footer from '../components/Footer'; // Importamos el Footer
import './Home.css';
import heroImage from '../assets/image-hero.jpg'; // Importamos la imagen correctamente
import Categories from '../components/Categories'; // Importamos el componente de categorías
import Product from '../components/Product'; // Importamos el componente de productos

const products = [
  { id: 1, name: "Aurora", price: "289.90", image: "path/to/image1.jpg" },
  { id: 2, name: "Luna", price: "289.90", image: "path/to/image2.jpg" },
  { id: 3, name: "Estrella", price: "289.90", image: "path/to/image3.jpg" },
  { id: 4, name: "Sol", price: "289.90", image: "path/to/image4.jpg" },
  { id: 5, name: "Cielo", price: "289.90", image: "path/to/image5.jpg" },
  { id: 6, name: "Rayo", price: "289.90", image: "path/to/image6.jpg" },
];

const Home = () => {
  return (
    <div className="home">
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
          <Product key={product.id} {...product} />
        ))}
      </div>

      <div className="shipping-info">
        <p>Obtén envío nacional gratis por compras de más de S/ 251.00. Aplican condiciones.</p>
      </div>

      {/* Mostrar todos los productos abajo */}
      
      <h2 className="product-subtitle">Todos los productos</h2>
      <div className="product-list">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      
      <Footer /> {/* Insertamos el Footer al final de la página */}
    </div>
  );
};

export default Home;  // Exportación por defecto
