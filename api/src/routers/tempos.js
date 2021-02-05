const express = require('express');
const router = new express.Router();
const Tempo = require('../models/tempo');

router.post('/tempos', async (req,res) =>{

    const tempo = new Tempo({
        titulo: req.body.titulo,
        tempo: req.body.tempo,
        tabela: req.body.table_id
    })

    try {
        await tempo.save();

        res.status(201).send(tempo);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;