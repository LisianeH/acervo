const express = require("express");
const router = express.Router();
const controller = require("../controller/author_controller.js");

// CREATE
router.post("/", controller.insertAuthor);
/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: CRUD de autores
 */

// READ
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Cadastra um novo autor
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: J.K. Rowling
 *               nationality:
 *                 type: string
 *                 example: Britânica
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Erro ao criar autor
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Lista de autores retornada com sucesso
 *       400:
 *         description: Erro ao listar autores
 */
router.get("/", controller.listAuthors);

// // READ (por id)
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Busca um autor pelo ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado com sucesso
 *       400:
 *         description: Erro ao buscar autor
 *       404:
 *         description: Autor não encontrado
 *   put:
 *     summary: Atualiza um autor
 *     tags: [Authors]
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
 *                 example: J.K. Rowling (Atualizado)
 *               nationality:
 *                 type: string
 *                 example: Britânica
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar autor
 *   delete:
 *     summary: Remove um autor
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Autor removido com sucesso
 *       400:
 *         description: Erro ao remover autor
 */
router.get("/:id", controller.listForName);

// // UPDATEs
router.put("/:id", controller.updateAuthor);

// //DELETE
router.delete("/:id", controller.deleteAuthor);

module.exports = router;
