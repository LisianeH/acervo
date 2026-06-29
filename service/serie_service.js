const repository = require("../repository/serie_repository.js");
const relational = require("../repository/serie_log_repository.js");

async function insert(entityJson, userId = null) {
  const serie = await repository.insert(entityJson);
  if (userId) {
    await relational.insertSeasonLog({ the_user: userId, serie: serie.id, season: 1, status: "A_VER" });
  }
  return serie;
}

async function list(title = null, userId = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }
  return await relational.listByUser(title, userId);
  // se admin - return await repository.list();
}

async function update(serieId, userId, entity) {
  // se admin - await repository.update(id, entity);
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }
  const allowedStatus = ["A_VER", "ASSISTINDO", "CONCLUIDO"];

  if (entity.status && !allowedStatus.includes(entity.status)) {
    throw new Error("Status inválido. Use: A_VER, ASSISTINDO ou CONCLUIDO.");
  }

  const seasonLog = await relational.findByUserAndSerie(serieId, userId);

  if (entity.season !== undefined) {
    if (isNaN(entity.season)) {
      throw new Error("Temporada inválida.");
    }

    if (Number(entity.season) < 1) {
      throw new Error("A temporada deve ser maior ou igual a 1.");
    }
  }

  const serie = await repository.findById(serieId);

  if (entity.season && Number(entity.season) > serie.number_seasons) {
    throw new Error(
      "A série possui apenas ${serie.number_seasons} temporada(s)."
    );
  }

  return await relational.updateSeasonLog(serieId, userId, entity);
}

async function deleteSerie(id) {
  await repository.deleteSerie(id);
}

module.exports = {
  insert,
  list,
  update,
  deleteSerie,
};
