const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: API para gestão de alunos da IPVC
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     summary: Obtém um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do aluno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 *       400:
 *         description: ID inválido
 */
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Erro ao criar aluno
 */
router.post('/', async (req, res) => {
  try {
    const novo = new Aluno(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar aluno' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno existente
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Erro ao atualizar aluno
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atualizado) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar aluno' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       400:
 *         description: Erro ao remover aluno
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const removido = await Aluno.findByIdAndDelete(req.params.id);
    if (!removido) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao remover aluno' });
  }
});

module.exports = router;
