const service = require("../service/serie_service.js");

async function insert(req, res) {
  try {
    const serieJson = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const result = await service.insert(serieJson, userId, role);

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function list(req, res) {
  try {
    const userId = req.user.id;
    const title = req.query.name;
    const myOnly = req.query.my !== undefined;

    const result = await service.list(title, userId, myOnly);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    const entity = req.body;

    await service.update(id, userId, entity, role);

    res.status(200).json({
      message: "Série atualizada com sucesso.",
    });
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function deleteSerie(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    
    await service.deleteSerie(id, userId, role);
    res.status(200).json({
      message: "Série deletada com sucesso.",
    });
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  insert,
  list,
  update,
  deleteSerie,
};
