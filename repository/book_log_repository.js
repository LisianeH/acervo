const CrudTemplate = require("../crud_template.js");
const pool = require("../database/database.js");
const TABLE = "reading_log";
const RELATION = "books";

const templateCrud = new CrudTemplate(TABLE, { 
    PK: "the_user", 
    FK: ["book"], 
    include: ["books", "authors", "gender"] 
});

const readingLogTemplate = new CrudTemplate(TABLE, {
    PK: "the_user"
});

const bookTemplate = new CrudTemplate(RELATION, {
    PK: "id",
    FK: ["author", "gender"],
    include: ["authors", "gender"]
});

async function insertReadingLog(log) {
    return await templateCrud.insert(log);
}

async function listByUser(title = null, userId) {
    const logs = await readingLogTemplate.findAllById(userId);
    const result = [];
    for (const log of logs) {
        const book = await bookTemplate.findById(log.book);
        result.push({
            the_user: log.the_user,
            status: log.status,
            book
        });
    }
    if (title) {
        const search = title.trim().toLowerCase();
        return result.filter(item =>
            item.book.title.toLowerCase().includes(search));
    }
    return result;
}

async function updateReadingLog(bookId, userId, entity) {
    return await templateCrud.updateWithQualify(bookId, userId, entity, "book");
}

async function findByUserAndBook(bookId, userId) {
    return await readingLogTemplate.findByTwoFields(
        "the_user",
        userId,
        "book",
        bookId
    );
}

async function countByBook(bookId) {
    try {
        const query = `SELECT COUNT(*) as count FROM ${TABLE} WHERE book = $1`;
        const result = await pool.query(query, [bookId]);
        return parseInt(result.rows[0].count, 10);
    } catch (error) {
        throw new Error(
            `an error was occurred: ${TABLE} - ${error.message}`,
        );
    }
}

async function deleteReadingLog(bookId, userId) {
    return await templateCrud.deleteWithQualify(bookId, userId, "book");
}

module.exports = {
    insertReadingLog,
    listByUser,
    updateReadingLog,
    findByUserAndBook,
    countByBook,
    deleteReadingLog,
};
