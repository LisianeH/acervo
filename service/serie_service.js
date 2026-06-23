const repository = require("../repository/serie_repository.js");

async function insert(entityJson) {
  return await repository.insert(entityJson);
}

async function list() {
  return await repository.list();
}

async function listForName(title) {
  return await repository.listForName(title);
}

async function update(id, entity) {
  await repository.update(id, entity);
}

async function deleteSerie(id) {
  await repository.deleteSerie(id);
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteSerie,
};
