const { MongoServerSelectionError } = require('mongodb');
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
    }
},
{
    timestamps: true
});

const Treino = mongoose.model('Treino', treinoSchema);

module.exports = Treino;