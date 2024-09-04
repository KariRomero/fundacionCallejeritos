const express = require('express');
const router = express.Router();
const {adoptarHandler, deleteAdoptarHandler} = require('../handlers/adoptarHandler');


router.post("/", adoptarHandler);
router.delete("/delete", deleteAdoptarHandler)

module.exports = router;