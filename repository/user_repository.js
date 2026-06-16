const pool = require('../database/database.js');

function objectUser(p) {
    if (!p) return null;
    return {
        id: p.id,
        name: p.name,
        email: p.email,
        password: p.password
    };
}

async function insert(name, email, password) {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [name, email, password]);
    return "Usuário cadastrado com sucesso!";
}

async function listAllUsers() {
    const query = 'SELECT * FROM users ORDER BY id';
    const resultado = await pool.query(query);
    return resultado.rows.map(objectUser);
}

async function findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const resultado = await pool.query(query, [id]);
    return objectUser(resultado.rows[0]);
}

async function update(id, name, email, password) {
    const query = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
    const resultado = await pool.query(query, [name, email, password, id]);
    
    if (resultado.rowCount === 0) {
        return "Usuário não encontrado";
    }
    return "Usuário atualizado com sucesso!";
}

module.exports = {
    insert,
    listAllUsers,
    findById,
    update
};