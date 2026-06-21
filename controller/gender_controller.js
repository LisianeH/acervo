const service = require("../service/gender_service.js");

async function insert(req, res) {
  try {
    const genderJson = req.body;
    const result = await service.insert(genderJson);
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
    const name = req.params.name;
    const result = await service.listForName(name);
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
      message: "Gênero atualizado com sucesso."
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteGender(req, res) {
  try {
    const id = req.params.id;
    await service.deleteGender(id);
    res.status(200).json({
      message: "Gênero deletado com sucesso."
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
  deleteGender,
};
