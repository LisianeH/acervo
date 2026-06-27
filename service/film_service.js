const repository = require("../repository/film_repository.js");

async function insertFilm(entityJson) {
  return await repository.insertFilm(entityJson);
}

async function listFilms() {
  return await repository.listFilms();
}

async function findByName(name) {
  return await repository.findByName(name);
}

async function updateFilm(id, entity) {
  await repository.updateFilm(id, entity);
}

async function deleteFilm(id) {
  await repository.deleteFilm(id);
}

module.exports = {
  insertFilm,
  listFilms,
  findByName,
  updateFilm,
  deleteFilm
};