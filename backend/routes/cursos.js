const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

// GET todos os cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST novo curso
router.post('/', async (req, res) => {
  const novoCurso = new Curso(req.body);
  try {
    const cursoSalvo = await novoCurso.save();
    res.status(201).json(cursoSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
