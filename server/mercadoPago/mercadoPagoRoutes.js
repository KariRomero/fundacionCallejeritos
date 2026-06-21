const express = require("express");
const { createPreference } = require("../mercadoPago/donacionUnicaHandler")
const {createSubscription} = require ("../mercadoPago/suscripcionMercadoPago")
const routerMercadoPago = express.Router();

routerMercadoPago.post("/create_preference", createPreference);
routerMercadoPago.post("/create_suscripcion", createSubscription);
module.exports = routerMercadoPago;