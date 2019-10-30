const express = require('express');
const router = express.Router();

const tipoController = require('../controllers/tipoController');

router.get('/tipo', tipoController.list);
router.post('/addTipo',tipoController.save);
router.get('/deleteTipo/:id',tipoController.delete)
router.get('/updateTipo/:id',tipoController.edit);
router.post('/updateTipo/:id',tipoController.update);

module.exports = router;