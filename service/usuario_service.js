const repository = require("../repository/usuario_repository.js");

// INSERT
async function insertUser(entity) {
  return await repository.insertUser(entity);
}

// FIND BY ID
async function findUserById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  return await repository.findUserById(id);
}

async function findAllUsers() {
  return await repository.listAllUsers();
}

// UPDATE
async function updateUser(id, entity) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }
  return await repository.updateUser(id, entity);
}

// DELETE
async function deleteUser(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  await repository.deleteUser(id);
}

module.exports = {
  insertUser,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
};
