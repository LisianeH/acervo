const service = require("../service/film_service.js");

// CREATE
async function insert(req, res) {
  try {
    const { title, gender, synopsis, the_cast } = req.body;

    const result = await service.insertFilm({
      title,
      gender,
      synopsis,
      the_cast,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

// READ ALL
async function list(req, res) {
  try {
    const films = await service.listFilms();
    res.json(films);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

// READ BY NAME
async function findByName(req, res) {
  try {
    7;
    const film = await service.findByName(req.params.name);
    res.json(film);
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;

    await service.updateFilm(id, entity);

    res.status(200).json({
      message: "Filme atualizado com sucesso.",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

// DELETE
async function remove(req, res) {
  try {
    await service.deleteFilm(req.params.id);

    res.status(200).json({
      message: "Filme removido com sucesso",
    });
  } catch (error) {
    res.status(error.status).json({ error: exception.message });
  }
}

module.exports = {
  list,
  findByName,
  insert,
  update,
  remove,
};
