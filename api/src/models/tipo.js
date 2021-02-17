const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({

    name : {
        type : String,
        trim: true,
        required: true
    },
    category : {
        type : String,
        trim: true,
        required: true
    }
},
{
    timestamps: true
});

const Tipo = mongoose.model('Tipo', tipoSchema);

module.exports = Tipo;