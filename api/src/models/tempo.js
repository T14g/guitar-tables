const mongoose = require('mongoose');

const tempoSchemma = new mongoose.Schema({
    tempo : {
        type: String,
        required: true,
        default: '00:00:00'
    },

    tabela : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treino"
    }
})

const tempo = mongoose.model('Tempo', tempoSchemma);

module.exports = tempo;