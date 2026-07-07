const CrudTemplate = require("../crud_template.js");
const pool = require("../database/database.js");
const TABLE = "season_log";
const RELATION = "series";

const templateCrud = new CrudTemplate(TABLE, { 
    PK: "the_user", 
    FK: ["serie", "stream", "gender"], 
    include: ["series", "streams", "gender"] 
});

const seasonLogTemplate = new CrudTemplate(TABLE, {
    PK: "the_user"
});

const serieTemplate = new CrudTemplate(RELATION, {
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
    await templateCrud.updateWithQualify(serieId, userId, entity, "serie");
}

async function findByUserAndSerie(serieId, userId) {
    return await seasonLogTemplate.findByTwoFields(
        "the_user",
        userId,
        "serie",
        serieId
    );
}

async function countBySerie(serieId) {
    try {
        const query = `SELECT COUNT(*) as count FROM ${TABLE} WHERE serie = $1`;
        const result = await pool.query(query, [serieId]);
        return parseInt(result.rows[0].count, 10);
    } catch (error) {
        throw new Error(
            `an error was occurred: ${TABLE} - ${error.message}`,
        );
    }
}

async function deleteSeasonLog(serieId, userId) {
    return await templateCrud.deleteWithQualify(serieId, userId);
}


module.exports = {
    insertSeasonLog,
    listByUser,
    updateSeasonLog,
    findByUserAndSerie,
    countBySerie,
    deleteSeasonLog,
};