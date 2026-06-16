const repository = require("../repository/filme_repository.js");

// INSERT
async function insert(title, gender, synopsis, cast) {
  if (!title || !gender || !synopsis || !cast) {
    throw new Error(
      "Título, gênero, sinopse, elenco são obrigatórios"
    );
  }

  return await repository.insert(title, gender, synopsis, cast);
}

// FIND BY ID
async function findById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const movie = await repository.findById(id);

  if (!movie) {
    throw new Error("Não há filme com esse ID");
  }

  return movie;
}

// UPDATE
async function update(id, title, gender, synopsis, cast) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  if (!title && !gender && !synopsis && !cast) {
    throw new Error("Informe pelo menos um dado para atualização");
  }


  const movie = await repository.findById(id);

  if (!movie) {
    throw new Error("Não há filme para atualizar");
  }

  return await repository.update(
    id,
    title || movie.title,
    gender || movie.gender,
    synopsis || movie.synopsis,
    cast || movie.cast
  );
}

// DELETE
async function deleteMovie(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const movie = await repository.findById(id);

  if (!movie) {
    throw new Error("Não há filme para excluir");
  }

  return await repository.deleteMovie(id);
}

module.exports = {
  insert,
  findById,
  update,
  deleteMovie,
};