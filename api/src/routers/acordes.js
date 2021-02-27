const express = require('express');
const Acorde = require('../models/acorde');
const router = new express.Router();

router.post('/acordes', async(req, res) => {

   const acorde = new Acorde(req.body);
   
   try {
        await acorde.save();
        res.status(201).send(acorde);

    } catch (e) {
         console.log(e);
         res.status(400).send(e);
    }
 
})

router.get('/acorde/:id', async(req, res) => {
   try {
      const Acordes = await Acorde.find({});

      if(!Acordes) {
         res.status(404).send();
      }

      res.send(Acordes);

   } catch (e) {
      console.log(e);
      res.status(500).send(e);
   }
})

module.exports = router;