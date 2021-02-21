const mongoose = require('mongoose');

const tempoSchemma = new mongoose.Schema({
    titulo : {
        type: String,
        required: true
    },
    tempo : {
        type: String,
        required: true,
        default: '00:00:00'
    },

    tabela : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treino"
    }
},
{
    timestamps: true
})

const tempo = mongoose.model('Tempo', tempoSchemma);

module.exports = tempo;