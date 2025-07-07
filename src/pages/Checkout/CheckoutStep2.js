import React from "react";
import "./Checkout.css";
import checkoutService from "../../services/checkoutService";
import cartService from "../../services/cartService";

const CheckoutStep2 = ({
  checkoutData,
  prevStep,
  nextStep,
  setCheckoutData,
}) => {
  const { address, card, products, total } = checkoutData;
  //const userId = "6865bca5c6e74d38eae10c45";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const handleConfirm = async () => {
    try {
      //alert("🧾 Dirección:\n" + JSON.stringify(address, null, 2));
      //alert("📇 Tarjeta:\n" + JSON.stringify(card, null, 2));
      if (
        !address ||
        !address.full_address ||
        !address.address_id ||
        !card ||
        !card.card_id
      ) {
        alert("Faltan datos de dirección o tarjeta.");
        return;
      }

      // Preparar productos para la orden
      const orderProducts = products.map((p) => {
        const unitPrice = parseFloat(
          p.unit_price?.$numberDecimal || p.unit_price || "0"
        );
        const totalAmount = (unitPrice * p.quantity).toFixed(2);

        return {
          product_id: p.product_id,
          quantity: p.quantity,
          unit_price: { $numberDecimal: unitPrice.toFixed(2) },
          total_amount: { $numberDecimal: totalAmount },
        };
      });

      const payload = {
        user_id: userId,
        products: orderProducts,
        total_amount: {
          $numberDecimal: parseFloat(total).toFixed(2),
        },
        shipping_address: {
          address_id: address._id || address.address_id,
          full_address: address.full_address,
        },
        payment_summary: {
          card_id: card.card_id,
          last_digits: card.last_digits,
        },
        status: "PENDING",
        delivery_date: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // entrega en 7 días
        created_at: new Date().toISOString(),
      };

      const createdOrder = await checkoutService.createOrder(payload);

      const productIds = products.map((p) => p.product_id);
      await cartService.removeProductsFromCart(userId, productIds);

      localStorage.removeItem("checkoutProducts");

      setCheckoutData((prev) => ({
        ...prev,
        orderId: createdOrder._id,
        createdAt: createdOrder.created_at,
      }));

      nextStep();
    } catch (error) {
      console.error(
        "Error al confirmar compra:",
        error.response?.data || error.message
      );
      alert(
        "Ocurrió un error al confirmar tu compra.\n" +
          JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="checkout-step">
      <h2>Resumen de Compra</h2>

      <h3>Dirección de Envío</h3>
      <p>{address?.full_address || "Sin dirección"}</p>

      <h3>Método de Pago</h3>
      <p>
        {card?.card_type || "Tarjeta no seleccionada"} ****
        {card?.last_digits || "0000"}
      </p>

      <h3>Productos</h3>
      <ul>
        {products.length > 0 ? (
          products.map((item) => {
            const price =
              item.unit_price?.$numberDecimal || item.unit_price || "0.00";
            return (
              <li key={item.product_id}>
                {item.name} x {item.quantity} - S/{" "}
                {parseFloat(price).toFixed(2)}
              </li>
            );
          })
        ) : (
          <p>No hay productos seleccionados.</p>
        )}
      </ul>

      <p>
        Subtotal ({products.length} productos): S/{" "}
        {parseFloat(total).toFixed(2)}
      </p>
      <p>Envío: S/ 0.00</p>

      <div className="checkout-buttons">
        <button onClick={prevStep}>Volver</button>
        <button onClick={handleConfirm}>Confirmar Compra</button>
      </div>
    </div>
  );
};

export default CheckoutStep2;
