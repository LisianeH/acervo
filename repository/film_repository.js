const CrudTemplate = require("../crud_template.js");
console.log(CrudTemplate);
const TABLE = "films";
const filmCrud = new CrudTemplate(TABLE);

async function insertFilm(entity) {
  return await filmCrud.insert(entity);
}

async function listFilms() {
  return await filmCrud.list();
}

async function findByName(name) {
  return await filmCrud.findNameLike(name);
}

async function updateFilm(id, entity) {
  await filmCrud.update(id, entity);
}

async function deleteFilm(id) {
  await filmCrud.delete(id);
}

module.exports = {
  insertFilm,
  listFilms,
  findByName,
  updateFilm,
  deleteFilm
};