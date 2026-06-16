const pool = require('../database/database.js');

function objectGender(p) {
    if (!p) return null;
    return {
        id: p.id,
        name: p.name
    };
}

async function insert(name) {
    const query = 'INSERT INTO gender (name) VALUES ($1)';
    await pool.query(query, [name]);
    return "Gênero cadastrado com sucesso!";
}

async function listAllGenders() {
    const query = 'SELECT * FROM gender ORDER BY id';
    const resultado = await pool.query(query);
    return resultado.rows.map(objectGender);
}

async function findByName(name) {
    const query = 'SELECT * FROM gender WHERE name LIKE \'%\' || $1 || \'%\''; 
    const resultado = await pool.query(query, [name]);
    return resultado.rows.map(objectGender);
}

async function findById(id) {
    const query = 'SELECT * FROM gender WHERE id = $1'; 
    const resultado = await pool.query(query, [id]);
    return objectGender(resultado.rows[0]);
}

async function update(id, name) {
    const query = 'UPDATE gender SET name = $1 WHERE id = $2';
    const resultado = await pool.query(query, [name, id]);
    
    if (resultado.rowCount === 0) {
        return "Gênero não encontrado";
    }
    return "Gênero atualizado com sucesso!";
}

async function remove(id) {
    const query = 'DELETE FROM gender WHERE id = $1';
    const resultado = await pool.query(query, [id]);
    
    if (resultado.rowCount === 0) {
        return "Gênero não encontrado";
    }
    return "Gênero deletado com sucesso!";
}

module.exports = {
    insert,
    listAllGenders,
    findByName,
    update,
    remove
};