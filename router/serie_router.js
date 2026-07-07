const express = require("express");
const router = express.Router();
const controller = require("../controller/serie_controller.js");

/**
 * @swagger
 * tags:
 *   - name: Series
 *     description: CRUD de séries de TV
 */

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Cadastra uma nova série
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Breaking Bad
 *               seasons:
 *                 type: integer
 *                 example: 5
 *               synopsis:
 *                 type: string
 *                 example: Um professor de química se volta para o crime
 *     responses:
 *       201:
 *         description: Série criada com sucesso
 *       400:
 *         description: Erro ao criar série
 */
router.post("/", controller.insert);

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Lista séries
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra séries pelo nome
 *     responses:
 *       200:
 *         description: Lista de séries retornada com sucesso
 *       400:
 *         description: Erro ao listar séries
 */
router.get("/", controller.list);

/**
 * @swagger
 * /series/{id}:
 *   put:
 *     summary: Atualiza uma série
 *     tags: [Series]
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
 *                 example: Breaking Bad Final Season
 *               seasons:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       200:
 *         description: Série atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar série
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Remove uma série
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Série removida com sucesso
 *       400:
 *         description: Erro ao remover série
 */
router.delete("/:id", controller.deleteSerie);

module.exports = router;