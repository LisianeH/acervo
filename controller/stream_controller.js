const service = require("../service/stream_service.js");

async function insert(req, res) {
  try {
    const streamJson = req.body;
    const result = await service.insert(streamJson);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function list(req, res) {
  const result = await service.list();
  res.status(200).json(result);
}

async function listForName(req, res) {
  try {
    const name = req.params.name;
    const result = await service.listForName(name);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    await service.update(id, entity);
    res.status(200).json({
      message: "Stream atualizado com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

async function deleteStream(req, res) {
  try {
    const id = req.params.id;
    await service.deleteStream(id);
    res.status(200).json({
      message: "Stream deletado com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteStream,
};
