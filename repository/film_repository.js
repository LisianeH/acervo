const CrudTemplate = require("../crud_template.js");

const TABLE = "films";
const filmCrud = new CrudTemplate(TABLE, {
  PK: "id",
  FK: ["gender"],
  include: ["gender"],
});

async function insertFilm(entity) {
  return await filmCrud.insert(entity);
}

async function listFilms() {
  return await filmCrud.list();
}

async function findByName(value) {
  return await filmCrud.findBy("title", value);
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
  deleteFilm,
};
