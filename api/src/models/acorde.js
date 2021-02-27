const mongoose = require('mongoose');

const acordeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    images : [String]
})

const acorde = mongoose.model('Acorde', acordeSchema);

module.exports = acorde;