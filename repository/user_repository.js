const CrudTemplate = require("../crud_template.js");
const TABLE = "users";
const userCrud = new CrudTemplate(TABLE);

async function insertUser(entity) {
  return await userCrud.insert(entity);
}

async function listAllUsers(entity) {
  return await userCrud.list();
}

async function updateUser(id, entity) {
  return await userCrud.update(id, entity);
}

async function deleteUser(id) {
  await userCrud.delete(id);
}

async function findUserById(id) {
  return await userCrud.findById(id);
}

module.exports = {
  insertUser,
  listAllUsers,
  updateUser,
  deleteUser,
  findUserById,
};
