const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

router.get('/producto', productoController.list);
router.post('/addProducto',productoController.save);
router.get('/deleteProducto/:id/:idSabor/:idLinea',productoController.delete)
router.get('/updateProducto/:id/:idSabor/:idLinea',productoController.edit);
router.post('/updateProducto/:id/:idSabor/:idLinea',productoController.update);

module.exports = router;