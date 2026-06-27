const repository = require("../repository/book_repository.js");

async function insertBook(entityJson) {
  return await repository.insertBook(entityJson);
}

async function listBooks() {
  return await repository.listBooks();
}

async function listById(id) {
  return await repository.findById(id);
}

async function updateBook(id, entity) {
  await repository.updateBook(id, entity);
}

async function deleteBook(id) {
  await repository.deleteBook(id);
}

module.exports = {
  insertBook,
  listBooks,
  listById,
  updateBook,
  deleteBook,
};
