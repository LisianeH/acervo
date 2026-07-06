const repository = require("../repository/serie_repository.js");
const relational = require("../repository/serie_log_repository.js");

async function insert(entityJson, userId = null, role = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    const serie = await repository.insert(entityJson);
    return serie;
  }
  
  if (role === "USER") {
    if (!entityJson.serie || !userId) {
      throw new Error("Usuário deve fornecer ID da série para registrar visualização.");
    }
    
    const serieLog = await relational.insertSeasonLog({
      the_user: userId,
      serie: entityJson.serie,
      season: entityJson.season || 1,
      status: entityJson.status || "A_VER"
    });
    return serieLog;
  }
  
  throw new Error("Não foi possível salvar série.");
}

async function list(title = null, userId = null, myOnly = false) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (myOnly) {
    return await relational.listByUser(title, userId);
  }

  return await repository.list(title);
}

async function update(serieId, userId, entity, role = null) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (role === "ADMIN") {
    return await repository.update(serieId, entity);
  }

  if (role === "USER") {
    const allowedStatus = ["A_VER", "ASSISTINDO", "CONCLUIDO"];

    if (entity.status && !allowedStatus.includes(entity.status)) {
      throw new Error("Status inválido. Use: A_VER, ASSISTINDO ou CONCLUIDO.");
    }

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
        `A série possui apenas ${serie.number_seasons} temporada(s).`
      );
    }

    // Filtrar apenas os campos permitidos para USER
    const allowedFields = { season: entity.season, status: entity.status };
    const filteredEntity = {};
    
    if (entity.season !== undefined) filteredEntity.season = entity.season;
    if (entity.status !== undefined) filteredEntity.status = entity.status;

    return await relational.updateSeasonLog(serieId, userId, filteredEntity);
  }

  throw new Error("Não foi possível atualizar série.");
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
