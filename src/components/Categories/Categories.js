// src/components/Categories.js
import React from 'react';
import './Categories.css';

const Categories = () => {
  return (
    <div className="categories">
      <h2>Nuestras Colecciones</h2>
      <div className="category-list">
        <div className="category-item">
          <p>Collares</p>
        </div>
        <div className="category-item">
          <p>Pulseras</p>
        </div>
        <div className="category-item">
          <p>Aretes</p>
        </div>
        <div className="category-item">
          <p>Anillos</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
