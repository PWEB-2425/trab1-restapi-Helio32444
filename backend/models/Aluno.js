const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: String
});

module.exports = mongoose.model('Aluno', alunoSchema);
