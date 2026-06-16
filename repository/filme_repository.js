const pool = require('../database/database.js');

function objectMovie(p) {
    if (!p) return null;
    return {
        id: p.id,
        title: p.title,
        gender: p.gender,
        synopsis: p.synopsis,
        cast: p.cast
    };
}

async function insert(title, gender, synopsis, cast) {
    const query = 'INSERT INTO films (title, gender, synopsis, cast) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [title, gender, synopsis, cast]);
    return "Filme cadastrado com sucesso!";
}

async function listAllMovies() {
    const query = 'SELECT * FROM films ORDER BY id';
    const resultado = await pool.query(query);
    return resultado.rows.map(objectMovie);
}

async function findById(id) {
    const query = 'SELECT * FROM films WHERE id = $1';
    const resultado = await pool.query(query, [id]);
    return objectMovie(resultado.rows[0]);
}

async function update(id, title, gender, synopsis, cast) {
    const query = 'UPDATE films SET title = $1, gender = $2, synopsis = $3, cast = $4 WHERE id = $5';
    const resultado = await pool.query(query, [title, gender, synopsis, cast, id]);
    
    if (resultado.rowCount === 0) {
        return "Filme não encontrado";
    }
    return "Filme atualizado com sucesso!";
}

async function deleteMovie(id) {
    const query = 'DELETE FROM films WHERE id = $1';

    const resultado = await pool.query(query, [id]);

    if (resultado.rowCount === 0) {
        return 'Filme não encontrado';
    }

    return 'Filme removido com sucesso!';
}

module.exports = {
    insert,
    listAllMovies,
    findById,
    update,
    deleteMovie
};
