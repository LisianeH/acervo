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
    const result = await authorService.listAuthors();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function listById(req, res) {
  try {
    const id = req.params.id;
    const result = await authorService.listById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function updateAuthor(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    await authorService.updateAuthor(id, entity);
    res.send();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function deleteAuthor(req, res) {
  try {
    const id = req.params.id;
    await authorService.deleteAuthor(id);
    res.send();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

module.exports = {
  insertAuthor,
  listAuthors,
  listById,
  updateAuthor,
  deleteAuthor,
};
