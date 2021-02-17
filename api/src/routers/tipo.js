const express = require('express');
const Tipo = require('../models/Tipo');
const router = new express.Router();

router.post('/tipo', async(req, res) => {
  
   const tipo = new Tipo(req.body);
   
   try {
        await tipo.save();
        res.status(201).send(tipo);

    } catch (e) {
         console.log(e);
         res.status(400).send(e);
    }
 
})

router.get('/tipo', async(req, res) => {
   try {
      const tipos = await Tipo.find({});

      if(!tipos) {
         res.status(404).send();
      }

      res.send(tipos);

   } catch (e) {
      console.log(e);
      res.status(500).send(e);
   }
})

module.exports = router;