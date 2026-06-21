const repository = require("../repository/stream_repository.js");

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

async function deleteStream(id) {
  await repository.deleteStream(id);
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteStream,
};
