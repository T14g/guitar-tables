const mongoose = require('mongoose');

const treinoSchema = new mongoose.Schema({

    name : {
        type : String,
        trim: true,
        required: true
    },

    json : {
        type: String,
        required: true
    },

    tempos : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tempo"
    }]
},
{
    timestamps: true
});

const Treino = mongoose.model('Treino', treinoSchema);

module.exports = Treino;