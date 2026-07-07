const express = require("express");
const router = express.Router();
const controller = require("../controller/gender_controller.js");

// CREATE
/**
 * @swagger
 * tags:
 *   - name: Genders
 *     description: Gerenciamento de gêneros e categorias
 */

/**
 * @swagger
 * /genders:
 *   post:
 *     summary: Cadastra um novo gênero
 *     tags: [Genders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ficção Científica
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 *       400:
 *         description: Erro ao criar gênero
 */
router.post("/", controller.insert);

// READ
/**
 * @swagger
 * /genders:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Genders]
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada com sucesso
 *       400:
 *         description: Erro ao listar gêneros
 */
router.get("/", controller.list);

// READ (for name)
router.get("/:name", controller.listForName);
/**
 * @swagger
 * /genders/name/{name}:
 *   get:
 *     summary: Busca um gênero pelo nome
 *     tags: [Genders]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Ficção Científica
 *         description: Nome exato ou termo de busca do gênero
 *     responses:
 *       200:
 *         description: Gênero encontrado com sucesso
 *       400:
 *         description: Erro ao buscar gênero pelo nome
 *       404:
 *         description: Gênero não encontrado
 */
router.get("/name/:name", controller.listForName);

// UPDATE
/**
 * @swagger
 * /genders/{id}:
 *   put:
 *     summary: Atualiza um gênero
 *     tags: [Genders]
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
 *               name:
 *                 type: string
 *                 example: Sci-Fi / Cyberpunk
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar gênero
 */
router.put("/:id", controller.update);

// DELETE
/**
 * @swagger
 * /genders/{id}:
 *   delete:
 *     summary: Remove um gênero
 *     tags: [Genders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Gênero removido com sucesso
 *       400:
 *         description: Erro ao remover gênero
 */
router.delete("/:id", controller.deleteGender);

module.exports = router;