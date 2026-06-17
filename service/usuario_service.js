const repository = require("../repository/usuario_repository.js");

// INSERT
async function insert(name, category, price) {
  if (!name || price === undefined) {
    throw new Error("Nome e preço são obrigatórios");
  }

  if (isNaN(Number(price))) {
    throw new Error("Preço deve ser um número");
  }

  price = Number(price);

  return await repository.insertUser(name, category, price);
}

// FIND BY ID
async function findById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const product = await repository.findById(id);

  if (!product) {
    throw new Error("Não há produtos");
  }

  return product;
}

// UPDATE
async function update(id, name, price) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  if (!name && price === undefined) {
    throw new Error("Informe pelo menos nome ou preço");
  }

  const product = await repository.findById(id);

  if (!product) {
    throw new Error("não há produtos");
  }

  return await repository.update(
    id,
    name || product.name,
    product.category,
    price !== undefined ? price : product.price,
  );
}

// DELETE
async function deleteProduct(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const product = await repository.findById(id);

  if (!product) {
    throw new Error("Não há produtos");
  }

  return await repository.deleteProduct(id);
}

module.exports = {
  insert,
  findById,
  update,
  deleteProduct,
};
