const express = require('express')
const router = express.Router()

const controller = require('../controller/gender_controller.js');

// CREATE
router.post('/', controller.insert);

// READ
router.get('/', controller.list);

// READ (por nome)
router.get('/:name', controller.listForName);

// UPDATE
router.put('/:id', controller.update);

// DELETE
router.delete('/:id', controller.remove);

module.exports = router;