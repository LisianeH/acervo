const CrudTemplate = require("../crud_template.js");
console.log(CrudTemplate);
const TABLE = "series";
const templateCrud = new CrudTemplate(TABLE, {
  PK: "id",
  FK: ["stream", "gender"],
  include: ["streams", "gender"],
});

async function insert(entity) {
  return await templateCrud.insert(entity);
}

async function list() {
  return await templateCrud.list();
}

async function listForName(title) {
  return await templateCrud.findNameLike(title);
}

async function findById(id) {
  return await templateCrud.findById(id)
}

async function update(id, entity) {
  await templateCrud.update(id, entity);
}

async function deleteSerie(id) {
  await templateCrud.delete(id);
}

module.exports = {
  insert,
  list,
  listForName,
  findById,
  update,
  deleteSerie,
};
