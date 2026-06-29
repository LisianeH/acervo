const service = require("../service/serie_service.js");

async function insert(req, res) {
  try {
    const serieJson = req.body;
    const userId = req.user.id;
    const result = await service.insert(serieJson, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function list(req, res) {
  try {
    const userId = req.user.id;
    const title = req.query.name;

    const result = await service.list(title, userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const entity = req.body;
    await service.update(id, userId, entity);
    res.status(200).json({
      message: "Série atualizada com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function deleteSerie(req, res) {
  try {
    const id = req.params.id;
    await service.deleteSerie(id);
    res.status(200).json({
      message: "Série deletada com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

module.exports = {
  insert,
  list,
  update,
  deleteSerie,
};
