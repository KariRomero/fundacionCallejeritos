const express = require('express');
const router = express.Router();
const { googleLoginHandler, getCurrentUserHandler, logoutHandler } = require('../handlers/googleAuthHandlers');


router.post('/google-login', googleLoginHandler);  
router.get('/current-user', getCurrentUserHandler);  
router.post('/logout', logoutHandler);  
module.exports = router;