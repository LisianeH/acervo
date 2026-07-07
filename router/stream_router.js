const express = require("express");
const router = express.Router();
const controller = require("../controller/stream_controller.js");

// CREATE
/**
 * @swagger
 * tags:
 *   - name: Streams
 *     description: Gerenciamento de plataformas de streaming
 */

/**
 * @swagger
 * /streams:
 *   post:
 *     summary: Cadastra uma nova plataforma de streaming
 *     tags: [Streams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Netflix
 *               url:
 *                 type: string
 *                 example: https://netflix.com
 *     responses:
 *       201:
 *         description: Streaming cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar streaming
 */
router.post("/", controller.insert);

// READ
/**
 * @swagger
 * /streams:
 *   get:
 *     summary: Lista todas as plataformas de streaming
 *     tags: [Streams]
 *     responses:
 *       200:
 *         description: Lista de streamings retornada com sucesso
 *       400:
 *         description: Erro ao listar streamings
 */
router.get("/", controller.list);

// READ (for name)
router.get("/:name", controller.listForName);
/**
 * @swagger
 * /streams/name/{name}:
 *   get:
 *     summary: Busca uma plataforma de streaming pelo nome
 *     tags: [Streams]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Netflix
 *         description: Nome ou parte do nome da plataforma de streaming
 *     responses:
 *       200:
 *         description: Streaming encontrado com sucesso
 *       400:
 *         description: Erro ao buscar streaming pelo nome
 *       404:
 *         description: Streaming não encontrado
 */
router.get("/name/:name", controller.listForName);

// UPDATE
/**
 * @swagger
 * /streams/{id}:
 *   put:
 *     summary: Atualiza um streaming
 *     tags: [Streams]
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
 *               url:
 *                 type: string
 *                 example: https://www.netflix.com/br
 *     responses:
 *       200:
 *         description: Streaming atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar streaming
 */
router.put("/:id", controller.update);

// DELETE
/**
 * @swagger
 * /streams/{id}:
 *   delete:
 *     summary: Remove um streaming
 *     tags: [Streams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Streaming removido com sucesso
 *       400:
 *         description: Erro ao remover streaming
 */
router.delete("/:id", controller.deleteStream);

module.exports = router;