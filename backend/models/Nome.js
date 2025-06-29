const mongoose = require('mongoose');

const nomeSchema = new mongoose.Schema({
   nome: {
      type: String,
      required: true}
   });

   module.exports = mongoose.model('Nome', nomeSchema);