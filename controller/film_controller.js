const service = require("../service/film_service.js");

// CREATE
async function insert(req, res) {
  try {
    const { title, gender, synopsis, the_cast } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    let payload;
    if (role === "ADMIN") {
      payload = { title, gender, synopsis, the_cast };
    } else {
      payload = { film: req.body.film, status: req.body.status, note: req.body.note };
    }

    const result = await service.insertFilm(payload, userId, role);

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

// READ ALL
async function list(req, res) {
  try {
    const userId = req.user.id;
    const title = req.query.name;
    const myOnly = req.query.my !== undefined;

    const films = await service.listFilms(title, userId, myOnly);
    res.json(films);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

// READ BY NAME
async function findByName(req, res) {
  try {
    const film = await service.findByName(req.params.name);
    res.json(film);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    const entity = req.body;

    await service.updateFilm(id, userId, entity, role);

    res.status(200).json({
      message: "Filme atualizado com sucesso.",
    });
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    await service.deleteFilm(id, userId, role);

    res.status(200).json({
      message: "Filme removido com sucesso",
    });
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  list,
  findByName,
  insert,
  update,
  remove,
};
