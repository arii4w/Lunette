// src/pages/ProductDetail.js
import React, { useState } from 'react';
import './ProductDetail.css'; // Estilos específicos para la vista del producto
import { useParams } from 'react-router-dom'; // Para obtener el ID del producto
import { Link } from 'react-router-dom'; // Para navegar hacia atrás o hacia el carrito
import Comment from '../../components/Comment/Comment'; // Importamos el componente de comentario
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { FiActivity } from "react-icons/fi";



// Datos de ejemplo del producto (esto podría ser dinámico)
const productData = {
    id: 1,
    name: 'Aurora',
    price: '289.90',
    description: 'Un collar exquisito que refleja la elegancia y el estilo único de Lunette.',
    image: 'path/to/product-image.jpg',
};

// Ejemplo de comentarios (puedes reemplazar esto con datos reales)
const commentsData = [
    { username: 'Juan', comment: 'Me encanta este producto, es increíblemente hermoso!', date: '2023-07-01' },
    { username: 'Maria', comment: 'Perfecto para cualquier ocasión, 100% recomendado.', date: '2023-06-28' },
];

const ProductDetail = () => {

    const [isHeartFilled, setIsHeartFilled] = useState(false); // Estado del corazón

    const handleHeartClick = () => {
      setIsHeartFilled(!isHeartFilled);
    };


    const { id } = useParams(); // Obtener el id del producto desde la URL
    const [quantity, setQuantity] = useState(1);
    const [newComment, setNewComment] = useState({
        comment: '',
    });
    const [comments, setComments] = useState(commentsData); // Estado de los comentarios

    // Función para manejar la cantidad
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    // Función para agregar al carrito
    const handleAddToCart = () => {
        alert(`Producto agregado al carrito: ${productData.name}, cantidad: ${quantity}`);
    };

    // Función para manejar el cambio en el formulario de comentario
    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };

    // Función para enviar un nuevo comentario
    const handlePostComment = () => {
        if (newComment.comment.trim()) {
            setComments([
                ...comments, 
                { 
                    username: 'Anónimo', // O cualquier valor por defecto que prefieras
                    comment: newComment.comment,
                    date: new Date().toLocaleDateString()
                }
            ]);
            setNewComment({ comment: '' }); // Limpiar solo el comentario
        }
    };


    return (
        <div className="pd-product-detail">
            <div className="pd-product-detail-container">
            <button 
    className={`pd-heart-button ${isHeartFilled ? 'filled' : ''}`} 
    onClick={handleHeartClick}
>
    {isHeartFilled ? '❤️' : '🤍'} {/* Probar con el icono como texto */}
</button>
                <div className="pd-product-image">
                    <img src={productData.image} alt={productData.name} />
                </div>

                <div className="pd-product-info">
                    <h1 className="pd-product-name">{productData.name}</h1>
                    <p className="pd-product-price">S/ {productData.price}</p>
                    <p className="pd-product-description">{productData.description}</p>

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

                    <Link to="/cart" className="pd-view-cart">Ver carrito</Link>
                </div>

            </div>

            {/* Sección de dejar un comentario */}
            <div className="pd-comment-form">
                <h3>Deja tu comentario</h3>
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
                <h2>Comentarios</h2>
                <div className="pd-comments-list">
                    {comments.map((comment, index) => (
                        <Comment
                            key={index}
                            username={comment.username}
                            comment={comment.comment}
                            date={comment.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
