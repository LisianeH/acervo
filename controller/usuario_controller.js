const service = require("../service/usuario_service.js");
const repository = require("../repository/usuario_repository.js");

// READ
async function list(req, res) {
  try {
    const users = await repository.listAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// READ FOR ID
async function findById(req, res) {
  try {
    const user = await service.findUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// CREATE
async function insert(req, res) {
  try {
    const entity = req.body;
    const result = await service.insertUser(entity);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;

    const user = await service.updateUser(id, entity);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  list,
  findById,
  insert,
  update,
};
