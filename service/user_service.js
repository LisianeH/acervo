const repository = require("../repository/user_repository.js");
const tokenService = require("./token_service");
const bcrypt = require("bcrypt");

// INSERT
async function insertUser(entity) {
  if (!entity || !entity.email || !entity.senha) {
    throw new Error("Dados do usuário incompletos");
  }

  const userToInsert = { ...entity };
  userToInsert.senha = await bcrypt.hash(userToInsert.senha, 10);

  return await repository.insertUser(userToInsert);
}

// FIND BY ID
async function findUserById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const user = await repository.findUserById(id);

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  return user;
}

async function findAllUsers() {
  return await repository.listAllUsers();
}

// UPDATE
async function updateUser(id, entity) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  if (!entity || Object.keys(entity).length === 0) {
    throw new Error("Nenhum dado informado para atualização");
  }

    const userToUpdate = { ...entity };
    userToUpdate.password = await bcrypt.hash(userToUpdate.password, 10);

    return await repository.updateUser(id, userToUpdate);
}

// DELETE
async function deleteUser(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  await repository.deleteUser(id);
}

// LOGIN
async function verifyLogin(user) {
    if(!user || !user.email || !user.password) {
        throw { id: 401, msg: "Email ou senha inexistentes!"}        
    }

    let userdb = await repository.findUserByEmail(user.email);
    if (!userdb) {
        throw { id: 401, msg: "Email ou senha inválidos!"};
    }

    if(userdb) {
      if(await bcrypt.compare(user.password, userdb.password)) {
          const token = tokenService.createToken({
              id: userdb.id,
              email: userdb.email
          });
          return {token: token};
      }
    }

    throw { id: 401, msg: "Email ou senha inválidos!"};
}

module.exports = {
  insertUser,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
  verifyLogin
};
