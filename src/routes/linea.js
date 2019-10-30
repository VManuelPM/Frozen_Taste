const express = require('express');
const router = express.Router();

const lineaController = require('../controllers/lineaController');

router.get('/linea', lineaController.list);
router.post('/addLinea',lineaController.save);
router.get('/deleteLinea/:id',lineaController.delete)
router.get('/updateLinea/:id',lineaController.edit);
router.post('/updateLinea/:id',lineaController.update);

module.exports = router;

