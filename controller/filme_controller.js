const service = require('../service/filme_service.js');
const repository = require('../repository/filme_repository.js');

// READ
async function list(req, res) {
    try {
        const movies = await repository.listAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ FOR ID
async function findById(req, res) {
    try {
        const movie = await service.findById(req.params.id);
        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// CREATE
async function insert(req, res) {
    try {
        const { title, gender, synopsis, cast } = req.body;
        const result = await service.insert(title, gender, synopsis, cast);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE
async function update(req, res) {
    try {
        const id = req.params.id;
        const { title, gender, synopsis, cast} = req.body;

        const result = await service.update(id, title, gender, synopsis, cast);

        res.json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function remove(req, res) {
    try {
        const result = await service.deleteMovie(req.params.id);

        res.json({
            message: result
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    list,
    findById,
    insert,
    update,
    remove
};