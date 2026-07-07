const authorService = require("../service/author_service.js");

async function insertAuthor(req, res) {
  try {
    const authorJson = req.body;
    const result = await authorService.insertAuthor(authorJson);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function listAuthors(req, res) {
  try {
    const name = req.query.name;
    const result = await authorService.listAuthors(name);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
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

async function updateAuthor(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    await authorService.updateAuthor(id, entity);
    res.status(200).json({
      message: "Autor atualizado com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function deleteAuthor(req, res) {
  try {
    const id = req.params.id;
    await authorService.deleteAuthor(id);
    res.status(200).json({
      message: "Autor deletado com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

module.exports = {
  insertAuthor,
  listAuthors,
  listForName,
  updateAuthor,
  deleteAuthor,
};
