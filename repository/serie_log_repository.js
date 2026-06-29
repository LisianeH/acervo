const CrudTemplate = require("../crud_template.js");
const TABLE = "season_log";
const RELATION = "series";

const templateCrud = new CrudTemplate(TABLE, null, { 
    PK: "the_user", 
    FK: ["serie", "stream", "gender"], 
    include: ["series", "streams", "gender"] 
});

const seasonLogTemplate = new CrudTemplate(TABLE, null, {
    PK: "the_user"
});

const serieTemplate = new CrudTemplate(RELATION, null, {
    PK: "id",
    FK: ["stream", "gender"],
    include: ["streams", "gender"]
});

async function insertSeasonLog(log) {
    return await templateCrud.insert(log);
}

async function listByUser(title = null, userId) {
    const logs = await seasonLogTemplate.findAllById(userId);
    const result = [];
    for (const log of logs) {
        const serie = await serieTemplate.findById(log.serie);
        result.push({
        the_user: log.the_user,
        season: log.season,
        status: log.status,
        serie
        });
    }
    if (title) {
        const search = title.trim().toLowerCase();
        return result.filter(item =>
            item.serie.title.toLowerCase().includes(search));
    }
    return result;
}

async function updateSeasonLog(serieId, userId, entity) {
    await templateCrud.update(serieId, userId, entity);
}

async function findByUserAndSerie(serieId, userId) {
    return await seasonLogTemplate.findByTwoFields(
        "the_user",
        userId,
        "serie",
        serieId
    );
}


module.exports = {
    insertSeasonLog,
    listByUser,
    updateSeasonLog,
    findByUserAndSerie,
};