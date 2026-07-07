const repository = require("../repository/film_repository.js");
const relational = require("../repository/film_log_repository.js");

async function insertFilm(entityJson, userId = null, role = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    const film = await repository.insertFilm(entityJson);
    return film;
  }
  
  if (role === "USER") {
    if (!entityJson.film || !userId) {
      throw new Error("Usuário deve fornecer ID do filme para registrar.");
    }

    const allowedStatus = ["A_VER", "CONCLUIDO"];
    const statusProvided = entityJson.status || "A_VER";

    if (!allowedStatus.includes(statusProvided)) {
      throw new Error(`Status inválido. Use: ${allowedStatus.join(", ")}.`);
    }
    
    const filmLog = await relational.insertFilmRegistration({
      the_user: userId,
      film: entityJson.film,
      status: statusProvided,
      note: entityJson.note || null
    });
    return filmLog;
  }
  
  throw new Error("Não foi possível salvar filme.");
}

async function listFilms(title = null, userId = null, myOnly = false) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (myOnly) {
    return await relational.listByUser(title, userId);
  }

  if (title) {
    return await repository.findByName(title);
  }

  return await repository.listFilms();
}

async function findByName(name) {
  return await repository.findByName(name);
}

async function updateFilm(filmId, userId, entity, role = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    return await repository.updateFilm(filmId, entity);
  }

  if (role === "USER") {
    const allowedStatus = ["A_VER", "CONCLUIDO"];

    if (entity.status && !allowedStatus.includes(entity.status)) {
      throw new Error("Status inválido. Use: A_VER ou CONCLUIDO.");
    }

    const filteredEntity = {};
    
    if (entity.status !== undefined) filteredEntity.status = entity.status;
    if (entity.note !== undefined) filteredEntity.note = entity.note;

    return await relational.updateFilmRegistration(filmId, userId, filteredEntity);
  }

  throw new Error("Não foi possível atualizar filme.");
}

async function deleteFilm(id, userId = null, role = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "USER") {
    return await relational.deleteFilmRegistration(id, userId);
  }

  if (role === "ADMIN") {
    const count = await relational.countByFilm(id);
    
    if (count > 0) {
      throw new Error(
        `Não é possível deletar o filme. Existem ${count} usuário(s) usando este filme. Remova os registros primeiro.`
      );
    }

    return await repository.deleteFilm(id);
  }

  throw new Error("Não foi possível deletar filme.");
}

module.exports = {
  insertFilm,
  listFilms,
  findByName,
  updateFilm,
  deleteFilm
};