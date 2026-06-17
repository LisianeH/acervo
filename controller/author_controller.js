const authorService = require("../service/author_service.js");

async function insertAuthor(req, res) {
  try {
    const authorJson = req.body;
    const result = await authorService.insertAuthor(authorJson);
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function listAuthors(req, res) {
  const result = await authorService.listAuthors();
  res.status(200).send(result);
}

async function listById(req, res) {
  try {
    const id = req.params.id;
    const result = await authorService.listById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateAuthor(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    authorService.updateAuthor(id, entity);
    res.send();
  } catch (error) {
    res.status(400).send();
  }
}

module.exports = {
  insertAuthor,
  listAuthors,
  listById,
  updateAuthor,
};
