const service = require('../service/gender_service.js');
const repository = require('../repository/gender_repository.js');

// READ
async function list(req, res) {
    try {
        const genders = await repository.listAllGenders();
        res.json(genders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ FOR NAME
async function listForName(req, res) {
    try {
        const gender = await service.findByName(req.params.id);
        res.json(gender);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// CREATE
async function insert(req, res) {
    try {
        const { name } = req.body;
        const result = await service.insert(name);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE
async function update(req, res) {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const result = await service.update(id, name);

        res.json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE
async function remove(req, res) {
    try {
        const id = req.params.id;

        const result = await service.deleteGender(id);

        res.json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    list,
    listForName,
    insert,
    update,
    remove
};