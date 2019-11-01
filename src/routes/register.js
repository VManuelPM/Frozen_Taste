const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

router.get('/register', registerController.load);
router.post('/register', registerController.registrar);


module.exports = router;