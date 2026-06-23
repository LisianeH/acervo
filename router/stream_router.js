const express = require("express");
const router = express.Router();
const controller = require("../controller/stream_controller.js");

// CREATE
router.post("/", controller.insert);

// READ
router.get("/", controller.list);

// READ (for name)
router.get("/:name", controller.listForName);

// UPDATE
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.deleteStream);

module.exports = router;