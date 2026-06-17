const repository = require("../repository/author.repository.js");

async function insertAuthor(entityJson) {
  return await repository.insertAuthor(entityJson);
}

async function listAuthors() {
  return await repository.listAuthors();
}

async function listById(id) {
  return await repository.listById(id);
}

async function updateAuthor(id, entity) {
  await repository.updateAuthor(id, entity);
}

async function deleteAuthor(id) {
  await repository.deleteAuthor(id);
}

module.exports = {
  insertAuthor,
  listAuthors,
  listById,
  updateAuthor,
  deleteAuthor,
};
