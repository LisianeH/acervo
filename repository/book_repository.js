const CrudTemplate = require("../crud_template.js");

const TABLE = "books";
const bookCrud = new CrudTemplate(TABLE, {
  PK: "id",
  FK: ["author", "gender"],
  include: ["authors", "gender"],
});

async function insertBook(entity) {
  return await bookCrud.insert(entity);
}

async function listBooks() {
  return await bookCrud.list();
}

async function findById(id) {
  return await bookCrud.findById(id);
}

async function updateBook(id, entity) {
  await bookCrud.update(id, entity);
}

async function deleteBook(id) {
  await bookCrud.delete(id);
}

module.exports = {
  insertBook,
  listBooks,
  findById,
  updateBook,
  deleteBook,
};
