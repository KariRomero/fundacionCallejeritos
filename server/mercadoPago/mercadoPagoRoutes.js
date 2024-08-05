const express = require("express");
const { createPreference } = require("../mercadoPago/donacionUnicaHandler")
const routerMercadoPago = express.Router();

// Ruta para crear una preferencia en MercadoPago
routerMercadoPago.post("/create_preference", createPreference);
routerMercadoPago.post("/create_suscripcion", createPreference);
module.exports = routerMercadoPago;