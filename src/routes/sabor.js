const express = require('express');
const router = express.Router();

const saborController = require('../controllers/saborController');

router.get('/sabor', saborController.list);
router.post('/addSabor',saborController.save);
router.get('/deleteSabor/:id',saborController.delete)
router.get('/updateSabor/:id',saborController.edit);
router.post('/updateSabor/:id',saborController.update);

module.exports = router;