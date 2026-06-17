const CrudTemplate = require("../crud_template.js");
const TABLE = "authors";
const authorCrud = new CrudTemplate(TABLE);

async function insertAuthor(entity) {
  return await authorCrud.insert(entity);
}

async function listAuthors() {
  return await authorCrud.list();
}

async function listById(id) {
  return await authorCrud.listById(id);
}

async function updateAuthor(id, entity) {
  return await authorCrud.update(id, entity);
}

module.exports = {
  insertAuthor,
  listAuthors,
  listById,
  updateAuthor,
};
