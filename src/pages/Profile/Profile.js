import React, { useState, useEffect } from 'react';
import './Profile.css';
import userService from '../../services/userService'; // Importamos el servicio de usuario
//import ProductCard from '../../components/'; // Importamos un componente para mostrar los productos favoritos
import commentService from '../../services/commentService'; // Importamos el servicio de comentarios

const Profile = () => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los productos favoritos

  const userId = "6864e6367a786a1395efe718"; // El ID del usuario (esto debería ser dinámico)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await userService.getUserById(userId); // Obtenemos la info del usuario
        if (fetchedUser) {
          setUser(fetchedUser); // Guardamos la información del usuario
          setFavorites(fetchedUser.favorites || []); // Guardamos los productos favoritos (si existen)
        } else {
          console.error('Error: La respuesta de la API no contiene datos del usuario');
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchUserData(); // Llamamos la función para cargar la información del usuario
  }, [userId]);

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
            {/*{favorites.map((product, index) => (
              <ProductCard key={product._id} product={product} />
            ))}*/}
          </div>
        ) : (
          <p>No tienes productos favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
