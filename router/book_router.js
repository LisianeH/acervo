const express = require("express");
const router = express.Router();
const controller = require("../controller/book_controller.js");

// CREATE
router.post("/", controller.insertBook);

// READ
router.get("/", controller.listBooks);

// // READ (por id)
router.get("/:id", controller.listById);

// // UPDATE
router.put("/:id", controller.updateBook);

// //DELETE
router.delete("/:id", controller.deleteBook);

module.exports = router;
