const repository = require("../repository/gender_repository.js");

async function insert(entityJson) {
  return await repository.insert(entityJson);
}

async function list() {
  return await repository.list();
}

async function listForName(id) {
  return await repository.listForName(id);
}

async function update(id, entity) {
  await repository.update(id, entity);
}

async function deleteGender(id) {
  await repository.deleteGender(id);
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteGender,
};
