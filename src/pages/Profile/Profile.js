import React, { useState, useEffect } from 'react';
import './Profile.css';
import userService from '../../services/userService'; // Importamos el servicio de usuario
//import ProductCard from '../../components/'; // Importamos un componente para mostrar los productos favoritos
import commentService from '../../services/commentService'; // Importamos el servicio de comentarios
import favoriteService from '../../services/favoriteService';
import Product from '../../components/Product/Product';
import productService from '../../services/productService'

const Profile = () => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los productos favoritos

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  //const userId = "6865bca5c6e74d38eae10c45";
  const userId = storedUser?._id;

  const fetchUserData = async () => {
    try {
      const fetchedUser = await userService.getUserById(userId);
      setUser(fetchedUser);

      const allProducts = await productService.getProducts();
      const favorites = await favoriteService.getFavoritesByUser(userId);

      const matchedFavorites = favorites.map(fav => {
        const product = allProducts.find(p => p._id === fav.product_id);
        if (!product) return null;
        return {
          ...product,
          favorite_id: fav._id,
          addedAt: fav.created_at,
        };
      }).filter(Boolean);

      setFavorites(matchedFavorites);
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchUserData();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
  try {
    await favoriteService.deleteFavoriteById(favoriteId);
    setFavorites(prev => prev.filter(fav => fav.favorite_id !== favoriteId));
    alert("Producto eliminado de favoritos.");
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error);
    alert("No se pudo eliminar el producto de favoritos.");
  }
};

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={user.photo_url} alt="Foto de perfil" className="profile-photo" />
        <h1>{user.username}</h1>
        <p>{user.email}</p>
        <p>{user.is_verified ? 'Verificado' : 'No verificado'}</p>
      </div>

      <div className="profile-addresses">
        <h2>Direcciones</h2>
        {user.addresses.length > 0 ? (
          user.addresses.map((address, index) => (
            <div key={address._id} className="profile-address">
              <p>{address.full_address}</p>
              {address.is_default && <span>(Predeterminada)</span>}
            </div>
          ))
        ) : (
          <p>No tienes direcciones guardadas.</p>
        )}
      </div>

      <div className="profile-cards">
        <h2>Tarjetas</h2>
        {user.cards.length > 0 ? (
          user.cards.map((card, index) => (
            <div key={card._id} className="profile-card">
              <p>Tipo de tarjeta: {card.card_type}</p>
              <p>Últimos 4 dígitos: {card.card_number.slice(-4)}</p>
            </div>
          ))
        ) : (
          <p>No tienes tarjetas guardadas.</p>
        )}
      </div>

      <div className="profile-favorites">
        <h2>Productos Favoritos</h2>
        {favorites.length > 0 ? (
          <div className="product-cards">
            {favorites.map((product) => (
      <div key={product._id} className="product-favorite-wrapper">
           <Product
              productId={product._id}
              name={product.name}
              price={product.price}
              image={product.photos?.[0]}
              description={product.description}
            />
            <p className="favorite-added-date">
            Añadido el: {new Date(product.addedAt).toLocaleDateString()}
            </p>
            <button 
  onClick={() => handleRemoveFavorite(product.favorite_id)} 
  className="profile-remove-favorite"
>
  Eliminar de favoritos
</button>
            </div>
            ))}
          </div>
        ) : (
          <p>No tienes productos favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
