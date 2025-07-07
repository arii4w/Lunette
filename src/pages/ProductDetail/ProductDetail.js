// src/pages/ProductDetail.js
import React, { useState, useEffect } from "react";
import "./ProductDetail.css"; // Estilos específicos para la vista del producto
import { useParams } from "react-router-dom"; // Para obtener el ID del producto
import { Link } from "react-router-dom"; // Para navegar hacia atrás o hacia el carrito
import Comment from "../../components/Comment/Comment"; // Importamos el componente de comentario
import productService from "../../services/productService";
import commentService from "../../services/commentService";
import cartService from "../../services/cartService";
import favoriteService from "../../services/favoriteService";
import reviewService from '../../services/reviewService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false); // Estado del corazón

  const [favoriteRecord, setFavoriteRecord] = useState(null); // Guardar el _id de favoritos
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (userId && product) {
        try {
          const favorites = await favoriteService.getFavoritesByUser(userId);
          const match = favorites.find((fav) => fav.product_id === product._id);
          if (match) {
            setIsHeartFilled(true);
            setFavoriteRecord(match); // Guardamos el favorito completo para poder borrarlo
          }
        } catch (error) {
          console.error("Error al verificar si es favorito:", error);
        }
      }
    };

    checkIfFavorite();
  }, [product]);

  const handleHeartClick = async () => {
    try {
      if (!isHeartFilled) {
        const newFavorite = await favoriteService.addFavorite(
          userId,
          product._id
        );
        setFavoriteRecord(newFavorite);
      } else if (favoriteRecord?._id) {
        await favoriteService.deleteFavoriteById(favoriteRecord._id);
        setFavoriteRecord(null);
      }
      setIsHeartFilled(!isHeartFilled);
    } catch (error) {
      console.error(
        "Error al actualizar favoritos:",
        error.response?.data || error.message || error
      );
      alert("Ocurrió un error al actualizar favoritos.");
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState({
    comment: "",
    rating: 5, // Valor por defecto
  });
  const [comments, setComments] = useState([]);

  // Función para formatear el precio
  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return price.$numberDecimal;
    }
    return price;
  };

  useEffect(() => {
    const fetchProductAndComments = async () => {
      try {
        // Obtener producto
        const productsData = await productService.getProducts();
        const foundProduct = productsData.find((p) => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);

          // Obtener comentarios
          const commentsData = await commentService.getCommentsByProductId(id);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchProductAndComments();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  // Función para manejar la cantidad
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Función para agregar al carrito
  const handleAddToCart = async () => {
    const productToSend = {
      product_id: product._id,
      quantity: parseInt(quantity),
      price: parseFloat(product.price?.$numberDecimal || product.price),
    };

    try {
      await cartService.addProductToCart(userId, productToSend);
      alert(
        `Producto agregado al carrito: ${product.name}, cantidad: ${quantity}`
      );
    } catch (error) {
      console.error(
        "Error al agregar producto al carrito:",
        error.response?.data || error.message || error
      );
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  // Función para manejar el cambio en el formulario de comentario
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  // Función para manejar el cambio en el rating
  const handleRatingChange = (newRating) => {
    setNewComment((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  // Actualizar handlePostComment para incluir el rating
  const handlePostComment = async () => {
  if (newComment.comment.trim()) {
    try {
      const commentData = {
        product_id: product._id,
        user_id: userId,
        comment: newComment.comment,
        rating: newComment.rating,
        created_at: new Date().toISOString(),
        additional_photos: [] // puedes omitirlo si no lo usas aún
      };

      await reviewService.addComment(commentData);

      // Actualizar la lista local
      const updatedComments = await reviewService.getCommentsByProductId(product._id);
      setComments(updatedComments);

      setNewComment({ comment: '', rating: 5 });
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      alert("Ocurrió un error al enviar tu comentario.");
    }
  }
  };

  return (
    <div className="pd-product-detail">
      <div className="pd-product-detail-container">
        <button
          className={`pd-heart-button ${isHeartFilled ? "filled" : ""}`}
          onClick={handleHeartClick}
        >
          {isHeartFilled ? "❤️" : "🤍"} {/* Probar con el icono como texto */}
        </button>
        <div className="pd-product-image">
          <img src={product.photos[0]} alt={product.name} />
        </div>

        <div className="pd-product-info">
          <h1 className="pd-product-name">{product.name}</h1>
          <p className="pd-product-price">S/ {formatPrice(product.price)}</p>
          <p className="pd-product-description">{product.description}</p>

          <div className="pd-quantity-selector">
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
          </div>

          <button className="pd-add-to-cart" onClick={handleAddToCart}>
            Agregar al carrito
          </button>

          <Link to="/cart" className="pd-view-cart">
            Ver carrito
          </Link>
        </div>
      </div>

      {/* Sección de dejar un comentario */}
      <div className="pd-comment-form">
        <h3>Deja tu comentario</h3>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                star <= newComment.rating ? "filled" : "empty"
              }`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <div className="pd-comment-input-container">
          <textarea
            name="comment"
            placeholder="¿Qué opinas sobre este producto?"
            value={newComment.comment}
            onChange={handleCommentChange}
            className="pd-textarea"
          />
          <button onClick={handlePostComment} className="pd-submit-comment">
            →
          </button>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="pd-comments-section">
        <h3>Comentarios</h3>
        <div className="pd-comments-list">
          {comments.map((comment, index) => (
            <Comment
              key={comment._id || index}
              userId={comment.user_id}
              comment={comment.comment}
              date={comment.created_at}
              rating={comment.rating}
              additional_photos={comment.additional_photos}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
