const express = require("express");
const router = express.Router();
const controller = require("../controller/author_controller.js");

// CREATE
router.post("/", controller.insertAuthor);

// READ
router.get("/", controller.listAuthors);

// // READ (for name)
router.get("/:name", controller.listForName);

// // UPDATE
router.put("/:id", controller.updateAuthor);

// //DELETE
router.delete("/:id", controller.deleteAuthor);

module.exports = router;
