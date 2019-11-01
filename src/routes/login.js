const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/login', loginController.load);
router.post('/login', loginController.entrar);


module.exports = router;