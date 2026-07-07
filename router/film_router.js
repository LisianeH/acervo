const express = require("express");
const router = express.Router();
const controller = require("../controller/film_controller");


// CREATE

/**
 * @swagger
 * tags:
 *   name: Films
 *   description: CRUD de filmes
 */


/**
 * @swagger
 * /films:
 *   post:
 *     summary: Cadastra um novo filme
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Interestelar
 *               gender:
 *                 type: integer
 *                 example: 1
 *               synopsis:
 *                 type: string
 *                 example: Um filme sobre viagem espacial
 *               the_cast:
 *                 type: string
 *                 example: Matthew McConaughey, Anne Hathaway
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Erro ao criar filme
 */
router.post("/", controller.insert);

// READ

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Lista filmes
 *     tags: [Films]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra filmes pelo nome
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *       400:
 *         description: Erro ao listar filmes
 */
router.get("/", controller.list);

// READ (por id)
router.get("/:name", controller.findByName);

// UPDATE
/**
 * @swagger
 * /films/{id}:
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Interestelar atualizado
 *               synopsis:
 *                 type: string
 *                 example: Nova descrição
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar filme
 */
router.put("/:id", controller.update);

//DELETE
router.delete('/:id', controller.remove);

module.exports = router;
/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Filme removido com sucesso
 *       400:
 *         description: Erro ao remover filme
 */
router.delete("/:id", controller.remove);


module.exports = router;