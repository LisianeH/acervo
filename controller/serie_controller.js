const service = require("../service/serie_service.js");

async function insert(req, res) {
  try {
    const serieJson = req.body;
    const result = await service.insert(serieJson);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function list(req, res) {
  const result = await service.list();
  res.status(200).json(result);
}

async function listForName(req, res) {
  try {
    const title = req.params.title;
    const result = await service.listForName(title);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    await service.update(id, entity);
    res.status(200).json({
      message: "Série atualizada com sucesso."
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteSerie(req, res) {
  try {
    const id = req.params.id;
    await service.deleteSerie(id);
    res.status(200).json({
      message: "Série deletada com sucesso."
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteSerie,
};
