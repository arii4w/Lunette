// src/pages/CartView/Cart.js
import React, { useState, useEffect } from "react";
import "./Cart.css";
import cartService from "../../services/cartService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;
  const [cart, setCart] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartService.getCartByUserId(userId);
        setCart(cartData);
        const allProductIds = cartData.products.map((p) => p.product_id);
        setSelectedProducts(allProductIds);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const calculateTotal = () => {
    if (!cart || !cart.products) return 0;
    return cart.products
      .filter((p) => selectedProducts.includes(p.product_id))
      .reduce((sum, p) => {
        const price = parseFloat(p.price?.$numberDecimal || p.price);
        return sum + price * p.quantity;
      }, 0)
      .toFixed(2);
  };

  // Función para eliminar del carrito
  const handleRemoveToCart = async (product) => {
    try {
      await cartService.removeProductsFromCart(userId, [product.product_id]);
      alert(
        `El producto ${product.name} se ha eliminado del carrito de compras`
      );

      // Actualiza visualmente el carrito
      const updatedCart = {
        ...cart,
        products: cart.products.filter(
          (p) => p.product_id !== product.product_id
        ),
      };
      setCart(updatedCart);
      setSelectedProducts((prev) =>
        prev.filter((id) => id !== product.product_id)
      );
    } catch (error) {
      console.error(
        `Error al eliminar el producto ${product.name} del carrito`,
        error
      );
      alert("Hubo un error al eliminar el producto del carrito.");
    }
  };

  // Función para vaciar el carrito
  const handleEmptyCart = async () => {
    try {
      await cartService.emptyCart(userId);
      alert(`Se ha vaciado el carrito de compras`);
      window.location.reload();
    } catch (error) {
      alert("Hubo un error al vaciar el carrito de compras.");
    }
  };

  // Función para comprar solo los seleccionados
  const handleBuySelected = () => {
    if (selectedProducts.length === 0) {
      alert("Selecciona al menos un producto para comprar.");
      return;
    }

    // Filtrar los productos seleccionados
    const selectedProductDetails = cart.products
      .filter((p) => selectedProducts.includes(p.product_id))
      .map((p) => ({
        product_id: p.product_id,
        name: p.name,
        quantity: p.quantity,
        unit_price: p.price,
      }));

    const total = selectedProductDetails
      .reduce((sum, p) => {
        const price = parseFloat(p.unit_price?.$numberDecimal || p.unit_price);
        return sum + price * p.quantity;
      }, 0)
      .toFixed(2);

    localStorage.setItem(
      "checkoutProducts",
      JSON.stringify({
        products: selectedProductDetails,
        total: total,
      })
    );

    // Redirigir al checkout
    navigate("/checkout");
  };

  if (loading) return <div className="ca-cart-load">Cargando carrito...</div>;

  if (!cart || cart.products.length === 0)
    return <div className="ca-cart-empty">Tu carrito está vacío.</div>;

  return (
    <div className="ca-cart">
      <h1 className="ca-cart-title">Mi Carrito</h1>
      <ul className="ca-cart-list">
        {cart.products.map((product) => (
          <li key={product.product_id} className="ca-cart-item">
            <div className="ca-cart-checkbox-wrapper">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.product_id)}
                onChange={() => handleSelectProduct(product.product_id)}
              />
            </div>

            <img
              src={product.photo_url}
              alt={product.name}
              className="ca-cart-img"
            />
            <span className="ca-cart-name">{product.name}</span>
            <span className="ca-cart-qty">x {product.quantity}</span>
            <span className="ca-cart-price">
              S/{" "}
              {(
                parseFloat(product.price?.$numberDecimal || product.price) *
                product.quantity
              ).toFixed(2)}
            </span>
            <button
              className="ca-remove-from-cart"
              onClick={() => handleRemoveToCart(product)}
            >
              Eliminar del carrito
            </button>
          </li>
        ))}
      </ul>

      <div className="ca-cart-total">
        <span>
          Total: <strong>S/ {calculateTotal()}</strong>
        </span>
        <button className="ca-buy-total-products" onClick={handleBuySelected}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Cart;
