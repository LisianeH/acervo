const CrudTemplate = require("../crud_template.js");
console.log(CrudTemplate);
const TABLE = "streams";
const templateCrud = new CrudTemplate(TABLE);

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

async function deleteStream(id) {
  await templateCrud.delete(id);
}

module.exports = {
  insert,
  list,
  listForName,
  update,
  deleteStream,
};