const express = require("express");
const router = express.Router();
const controller = require("../controller/book_controller.js");

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: CRUD de livros
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cadastra um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: O Hobbit
 *               author:
 *                 type: string
 *                 example: J.R.R. Tolkien
 *               gender_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro ao criar livro
 */
router.post("/", controller.insertBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lista livros
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra livros pelo título
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *       400:
 *         description: Erro ao listar livros
 */
router.get("/", controller.listBooks);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Books]
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
 *                 example: O Hobbit - Edição Especial
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar livro
 */
router.put("/:id", controller.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove um livro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 *       400:
 *         description: Erro ao remover livro
 */
router.delete("/:id", controller.deleteBook);

module.exports = router;