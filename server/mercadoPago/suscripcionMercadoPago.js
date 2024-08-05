const { MercadoPagoConfig, Subscription } = require('mercadopago');
require('dotenv').config();

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

const createSubscription = async (req, res) => {
  const { title, unit_price, frequency, frequency_type,quantity } = req.body;


  try {
    const body = {
      items: [{
        title: title,
        quantity: Number(quantity), // Asegúrate de que sea un número
        unit_price: Number(unit_price),
        currency_id: "ARS",
      }],
      back_urls: {
        success: "http://localhost:5173",
        failure: "http://localhost:5173",
        pending: "http://localhost:5173",
      },
      auto_return: "approved",
      subscription: {
        frequency: frequency, // Frecuencia en días, semanas o meses, proporcionada en la solicitud
        frequency_type: frequency_type, // 'day', 'week' o 'month', proporcionado en la solicitud
        transaction_amount: Number(unit_price),
        currency_id: "ARS",
        start_date: new Date().toISOString(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // Fecha de finalización (1 año a partir de ahora)
      }
    };

    // Crear la suscripción
    const subscription = new Subscription(mercadoPagoConfig);
    const result = await subscription.create({ body });

    // Enviar la respuesta con el ID de la suscripción
    res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la suscripción :( " });
  }
};

module.exports = { createSubscription };