import React, { useState, useEffect } from "react";
import { ObjectId } from "bson";
import "./Checkout.css";
import checkoutService from "../../services/checkoutService";

const CheckoutStep1 = ({ checkoutData, setCheckoutData, nextStep }) => {
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [useSavedCard, setUseSavedCard] = useState(false);

  //const userId = "6865bca5c6e74d38eae10c45";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  useEffect(() => {
    if (!checkoutData.address)
      setCheckoutData((prev) => ({ ...prev, address: {} }));
    if (!checkoutData.card) setCheckoutData((prev) => ({ ...prev, card: {} }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAddr = await checkoutService.getAddresses(userId);
        const resCards = await checkoutService.getCards(userId);
        setAddresses(resAddr);
        setCards(resCards);
      } catch (err) {
        console.error("Error al obtener datos de usuario:", err);
      }
    };
    fetchData();
  }, [userId]);

  const handleAddressChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      address: {
        ...checkoutData.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleCardChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      card: {
        ...checkoutData.card,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleContinue = async () => {
    let updatedAddress = checkoutData.address;
    let updatedCard = checkoutData.card;

    // Validación de campos obligatorios
    if (!useSavedAddress && !updatedAddress?.full_address?.trim()) {
      alert("Por favor ingresa una dirección válida.");
      return;
    }

    if (!useSavedCard) {
      const requiredFields = [
        "card_number",
        "card_type",
        "cardholder_name",
        "expiration_month_year",
        "cvv",
      ];
      const missing = requiredFields.filter(
        (field) => !updatedCard?.[field]?.trim()
      );
      if (missing.length > 0) {
        alert("Por favor completa todos los campos de la tarjeta.");
        return;
      }
    }

    try {
      if (!useSavedAddress && updatedAddress?.full_address) {
        if (updatedAddress.save) {
          const savedAddress = await checkoutService.addAddress(
            userId,
            updatedAddress.full_address
          );
          updatedAddress = {
            address_id: savedAddress._id,
            //full_address: savedAddress.full_address,
            full_address: updatedAddress.full_address,
          };
        } else {
          updatedAddress = {
            address_id: new ObjectId().toHexString(),
            full_address: updatedAddress.full_address,
          };
        }
      }

      // Guardar tarjeta si es nueva
      if (!useSavedCard && updatedCard?.card_number) {
        const lastDigits = updatedCard.card_number.slice(-4);
        if (updatedCard.save) {
          const newCard = {
            card_number: updatedCard.card_number,
            card_type: updatedCard.card_type,
            cardholder_name: updatedCard.cardholder_name,
            expiration_month_year: updatedCard.expiration_month_year,
            cvv: updatedCard.cvv,
          };
          alert("🧪 Datos de tarjeta a guardar:\n" + JSON.stringify(newCard, null, 2));
          const savedCard = await checkoutService.addCard(userId, newCard);
          alert("🧪 Datos de tarjeta guardados:\n" + JSON.stringify(savedCard, null, 2));
          updatedCard = {
            /*//card_id: savedCard.card_id, // del backend
            card_id: savedCard._id,
            //last_digits: updatedCard.card_number.slice(-4), // usamos el original, no el del backend
            last_digits: savedCard.last_digits,
            card_type: savedCard.card_type,*/

            card_id: savedCard._id,
            last_digits: updatedCard.card_number.slice(-4),
            card_type: updatedCard.card_type,
          };
        } else {
          updatedCard = {
            card_id: new ObjectId().toHexString(),
            last_digits: updatedCard.card_number.slice(-4),
            card_type: updatedCard.card_type,
          };
        }
      }

      // Actualizar estado global
      /*setCheckoutData((prev) => ({
        ...prev,
        address: updatedAddress,
        card: updatedCard,
      }));*/
      setCheckoutData((prev) => {
        const newData = {
          ...prev,
          address: updatedAddress,
          card: updatedCard,
        };
        console.log(
          "✅ Datos finales del checkout antes de nextStep:",
          newData
        );
        return newData;
      });
      nextStep();
    } catch (error) {
      console.error(
        "Error al guardar datos:",
        error.response?.data || error.message
      );
      alert(
        "Error al guardar dirección/tarjeta:\n" +
          JSON.stringify(error.response?.data || error.message, null, 2)
      );
    }
  };

  return (
    <div className="checkout-step">
      <h2>Información de Pago y Envío</h2>

      <h3>Dirección de Envío</h3>
      <label>
        <input
          type="checkbox"
          checked={useSavedAddress}
          onChange={() => setUseSavedAddress(!useSavedAddress)}
        />
        Usar una dirección guardada
      </label>
      {useSavedAddress && addresses.length > 0 ? (
        <select
          onChange={(e) =>
            setCheckoutData({
              ...checkoutData,
              address: addresses.find((addr) => addr._id === e.target.value),
            })
          }
        >
          <option value="">Seleccionar dirección</option>
          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.full_address}
            </option>
          ))}
        </select>
      ) : (
        <>
          <input
            type="text"
            name="full_address"
            placeholder="Dirección completa"
            value={checkoutData.address?.full_address || ""}
            onChange={handleAddressChange}
          />
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  address: {
                    ...checkoutData.address,
                    save: e.target.checked,
                  },
                })
              }
            />
            Guardar esta dirección para futuras fechas
          </label>
        </>
      )}

      <h3>Información de Pago</h3>
      <label>
        <input
          type="checkbox"
          checked={useSavedCard}
          onChange={() => setUseSavedCard(!useSavedCard)}
        />
        Usar una tarjeta guardada
      </label>
      {useSavedCard && cards.length > 0 ? (
        <select
          onChange={(e) => {
            const selectedCard = cards.find(
              (card) => card._id === e.target.value
            );
            setCheckoutData({
              ...checkoutData,
              card: {
                card_id: selectedCard._id,
                last_digits: selectedCard.card_number.slice(-4),
                card_type: selectedCard.card_type,
              },
            });
          }}
        >
          <option value="">Seleccionar tarjeta</option>
          {cards.map((card) => (
            <option key={card._id} value={card._id}>
              {card.card_type} **** {card.card_number.slice(-4)}
            </option>
          ))}
        </select>
      ) : (
        <>
          <select
            name="card_type"
            value={checkoutData.card?.card_type || ""}
            onChange={handleCardChange}
          >
            <option value="">Seleccionar tipo</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
          </select>
          <input
            type="text"
            name="card_number"
            placeholder="Número de tarjeta"
            value={checkoutData.card?.card_number || ""}
            onChange={handleCardChange}
          />
          <input
            type="text"
            name="cardholder_name"
            placeholder="Nombre del titular"
            value={checkoutData.card?.cardholder_name || ""}
            onChange={handleCardChange}
          />
          <input
            type="text"
            name="expiration_month_year"
            placeholder="Fecha de vencimiento (MM/AA)"
            value={checkoutData.card?.expiration_month_year || ""}
            onChange={handleCardChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={checkoutData.card?.cvv || ""}
            onChange={handleCardChange}
          />
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  card: {
                    ...checkoutData.card,
                    save: e.target.checked,
                  },
                })
              }
            />
            Guardar esta tarjeta para futuras compras
          </label>
        </>
      )}

      <div className="checkout-buttons">
        <button onClick={handleContinue}>Continuar</button>
      </div>
    </div>
  );
};

export default CheckoutStep1;
