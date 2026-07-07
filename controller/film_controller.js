const service = require("../service/film_service.js");

async function insert(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const result = await service.insert(req.body, userId, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function list(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const { name } = req.query;
    const result = await service.list(name, userId, role);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const result = await service.update(req.params.id, userId, req.body, role);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    await service.deleteFilm(req.params.id);
    res.status(200).json({ message: "Filme removido com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { 
  insert,
  list,
  update,
  remove 
};