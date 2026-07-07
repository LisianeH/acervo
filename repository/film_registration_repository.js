const CrudTemplate = require("../crud_template.js");
const TABLE = "film_registration";
const RELATION = "films";

const templateCrud = new CrudTemplate(TABLE, {
    PK: "the_user",
    FK: ["film"],
    include: ["films"]
});

const filmregistrationTemplate = new CrudTemplate(TABLE, {
    PK: "the_user"
});

const filmTemplate = new CrudTemplate(RELATION, {
    PK: "id"
});

async function findByUserAndFilm(filmId, userId) {
    return await filmregistrationTemplate.findByTwoFields(
        "the_user",
        userId,
        "film",
        filmId
    );
}

async function insertFilmRegistration(log) {
    return await templateCrud.insert(log);
}

async function listByUser(title = null, userId) {
    const logs = await filmregistrationTemplate.findAllById(userId);
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
    return await templateCrud.updateByFields(
        { the_user: userId, film: filmId },
        entity
    );
}

module.exports = {
    insertFilmRegistration,
    listByUser,
    updateFilmRegistration,
    findByUserAndFilm,
};