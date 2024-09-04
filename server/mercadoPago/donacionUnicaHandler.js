const { MercadoPagoConfig, Preference } = require('mercadopago');

require("dotenv").config();

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });


const createPreference = async (req, res) => {
const {  title, unit_price ,quantity } = req.body
    try {
        const body = {
            items: [{
                title: title,
                quantity: Number(quantity),
                unit_price: Number(unit_price),
                currency_id: "ARS",
            }],
            back_urls: {
                success: "https://fundacion-callejeritos.vercel.app/",
                failure: "https://fundacion-callejeritos.vercel.app/",
                pending: "https://fundacion-callejeritos.vercel.app/",
            },
            auto_return: "approved"
        };

        const preference = new Preference(mercadoPagoConfig);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error al crear la preferencia :( " });
    }
};

module.exports = { createPreference };