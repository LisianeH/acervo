const express = require('express')
const router = express.Router()

const controller = require('../controller/filme_controller.js');

// CREATE
router.post('/', controller.insert);

// READ
router.get('/', controller.list);

// READ (por id)
router.get('/:id', controller.findById);

// UPDATE
router.put('/:id', controller.update);

//DELETE
router.delete('/:id', controller.remove);

module.exports = router;