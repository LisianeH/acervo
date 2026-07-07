const CrudTemplate = require("../crud_template.js");

const TABLE = "authors";
const authorCrud = new CrudTemplate(TABLE, {
  PK: "id",
});

async function insertAuthor(entity) {
  return await authorCrud.insert(entity);
}

async function listAuthors() {
  return await authorCrud.list();
}

async function listAuthorsByName(name) {
  return await authorCrud.findBy("name", name);
}

async function findById(id) {
  return await authorCrud.findById(id);
}

async function updateAuthor(id, entity) {
  await authorCrud.update(id, entity);
}

async function deleteAuthor(id) {
  await authorCrud.delete(id);
}

module.exports = {
  insertAuthor,
  listAuthors,
  listAuthorsByName,
  findById,
  updateAuthor,
  deleteAuthor,
};
