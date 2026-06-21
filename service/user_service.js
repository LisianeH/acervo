const repository = require("../repository/user_repository.js");

// INSERT
async function insertUser(entity) {
  return await repository.insertUser(entity);
}

// FIND BY ID
async function findUserById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const user = await repository.findUserById(id);

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  return user;
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
