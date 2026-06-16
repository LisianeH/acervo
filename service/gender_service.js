const repository = require("../repository/gender_repository.js");

// INSERT
async function insert(name) {
  if (!name) {
    throw new Error("Nome é obrigatório");
  }

  return await repository.insert(name);
}

// FIND BY NAME
async function findByName(name) {
  if (!name ) {
    throw new Error("Nome vazio para busca");
  }

  const gender = await repository.findByName(name);

  if (!gender) {
    throw new Error("Não há gênero com esse nome");
  }

  return gender;
}

// UPDATE
async function update(id, name) {
  if (!name) {
    throw new Error("Informe o nome");
  }

  const gender = await repository.findById(id);

  if (!gender) {
    throw new Error("Gênero não encontrado");
  }

  return await repository.update(
    id,
    name
  );
}

// DELETE
async function remove(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const gender = await repository.findById(id);

  if (!gender) {
    throw new Error("Não há gênero para remover");
  }

  return await repository.remove(id);
}

module.exports = {
  insert,
  findByName,
  update,
  remove
};
