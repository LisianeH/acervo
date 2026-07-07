const express = require("express");
const router = express.Router();
const controller = require("../controller/user_controller.js");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
router.post("/", controller.insert);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       400:
 *         description: Erro ao listar usuários
 */
router.get("/", controller.list);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       400:
 *         description: Erro ao buscar usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", controller.findById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza dados de um usuário
 *     tags: [Users]
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
 *                 example: João da Silva
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar usuário
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: Erro ao remover usuário
 */
router.delete("/:id", controller.deleteUser);

module.exports = router;