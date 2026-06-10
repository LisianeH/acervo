const repository = require("../repository/usuario_repository.js");

// INSERT
async function insert(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Nome, email e senha são obrigatórios");
  }

  return await repository.insert(name, email, password);
}

// FIND BY ID
async function findById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const user = await repository.findById(id);

  if (!user) {
    throw new Error("Não há usuário com esse ID");
  }

  return product;
}

// UPDATE
async function update(id, name, email, password) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido do cliente");
  }

  if (!name && !email && !password) {
    throw new Error("Informe pelo menos um dado para atualização do cliente");
  }

  const user = await repository.findById(id);

  if (!user) {
    throw new Error("Não há usuário para atualizar");
  }

  return await repository.update(
    id,
    name,
    email,
    password,
  );
}

module.exports = {
  insert,
  findById,
  update,
};
