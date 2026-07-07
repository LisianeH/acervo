const repository = require("../repository/author_repository.js");

async function insertAuthor(entityJson) {
  return await repository.insertAuthor(entityJson);
}

async function listAuthors() {
  return await repository.listAuthors();
}

async function listForName(id) {
  return await repository.listForName(id);
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
  listForName,
  updateAuthor,
  deleteAuthor,
};
