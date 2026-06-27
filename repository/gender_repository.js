const CrudTemplate = require("../crud_template.js");

const TABLE = "gender";
const templateCrud = new CrudTemplate(TABLE, { PK: "id" });

async function insert(entity) {
  return await templateCrud.insert(entity);
}

async function list() {
  return await templateCrud.list();
}

async function listForName(id) {
  return await templateCrud.findNameLike(id);
}

async function update(id, entity) {
  await templateCrud.update(id, entity);
}

async function deleteGender(id) {
  await templateCrud.delete(id);
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteGender,
};
