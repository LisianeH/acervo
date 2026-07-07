const repository = require("../repository/film_repository.js");
const relational = require("../repository/film_registration_repository.js");

const allowedStatus = ["A_VER", "CONCLUIDO"];

function validateStatus(status) {
  if (status === undefined || status === null) return;
  if (!allowedStatus.includes(status)) {
    throw new Error("Status inválido. Use: A_VER ou CONCLUIDO.");
  }
}

function validateNote(note) {
  if (note === undefined || note === null) return;
  if (typeof note !== "number" || note < 1 || note > 5) {
    throw new Error("A nota deve ser um número entre 1 e 5");
  }
}

async function insert(entityJson, userId, role) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    return await repository.insertFilm(entityJson);
  }

  if (role === "USER") {
    if (!entityJson.film) {
      throw new Error("Usuário deve fornecer o ID do filme para registrar.");
    }

    validateStatus(entityJson.status);
    validateNote(entityJson.note);

    const existing = await relational.findByUserAndFilm(entityJson.film, userId);
    if (existing) {
      throw new Error("Este filme já foi registrado para este usuário.");
    }

    return await relational.insertFilmRegistration({
      the_user: userId,
      film: entityJson.film,
      status: entityJson.status || "A_VER",
      note: entityJson.note || null,
    });
  }

  throw new Error("Não foi possível salvar filme.");
}

async function list(name, userId, role) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    if (name) {
      return await repository.findByName(name);
    }
    return await repository.listFilms();
  }

  if (role === "USER") {
    return await relational.listByUser(name, userId);
  }

  throw new Error("Não foi possível listar filmes.");
}

async function update(filmId, userId, entity, role) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    return await repository.updateFilm(filmId, entity);
  }

  if (role === "USER") {
    validateStatus(entity.status);
    validateNote(entity.note);

    return await relational.updateFilmRegistration(
      filmId,
      userId,
      entity
    );
  }

  throw new Error("Não foi possível atualizar filme.");
}

async function deleteFilm(id) {
  await repository.deleteFilm(id);
}

module.exports = {
  insert,
  list,
  update,
  deleteFilm,
};