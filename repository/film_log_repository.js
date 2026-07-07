const CrudTemplate = require("../crud_template.js");
const pool = require("../database/database.js");
const TABLE = "film_registration";
const RELATION = "films";

const templateCrud = new CrudTemplate(TABLE, { 
    PK: "the_user", 
    FK: ["film", "gender"], 
    include: ["films", "gender"] 
});

const filmLogTemplate = new CrudTemplate(TABLE, {
    PK: "the_user"
});

const filmTemplate = new CrudTemplate(RELATION, {
    PK: "id",
    FK: ["gender"],
    include: ["gender"]
});

async function insertFilmRegistration(log) {
    return await templateCrud.insert(log);
}

async function listByUser(title = null, userId) {
    const logs = await filmLogTemplate.findAllById(userId);
    const result = [];
    for (const log of logs) {
        const film = await filmTemplate.findById(log.film);
        result.push({
            the_user: log.the_user,
            status: log.status,
            note: log.note,
            film
        });
    }
    if (title) {
        const search = title.trim().toLowerCase();
        return result.filter(item =>
            item.film.title.toLowerCase().includes(search));
    }
    return result;
}

async function updateFilmRegistration(filmId, userId, entity) {
    return await templateCrud.updateWithQualify(filmId, userId, entity, "film");
}

async function findByUserAndFilm(filmId, userId) {
    return await filmLogTemplate.findByTwoFields(
        "the_user",
        userId,
        "film",
        filmId
    );
}

async function countByFilm(filmId) {
    try {
        const query = `SELECT COUNT(*) as count FROM ${TABLE} WHERE film = $1`;
        const result = await pool.query(query, [filmId]);
        return parseInt(result.rows[0].count, 10);
    } catch (error) {
        throw new Error(
            `an error was occurred: ${TABLE} - ${error.message}`,
        );
    }
}

async function deleteFilmRegistration(filmId, userId) {
    return await templateCrud.deleteWithQualify(filmId, userId, "film");
}

module.exports = {
    insertFilmRegistration,
    listByUser,
    updateFilmRegistration,
    findByUserAndFilm,
    countByFilm,
    deleteFilmRegistration,
};
