const express = require('express');
const Treino = require('../models/Treino');
const Tempo = require('../models/tempo');
const router = new express.Router();

router.post('/treino', async(req, res) => {
   console.log(req.body);
   const treino = new Treino(req.body);
   
   try {
        await treino.save();
        //if task is saved send 201 response
        res.status(201).send(treino);
    } catch (e) {
         console.log(e);
         res.status(400).send(e);
    }
 
})

router.get('/treinos', async(req, res) => {

   try {
      let treinos = await Treino.find({});
      res.status(200).send(treinos);
   } catch (e) {
      console.log(e);
      res.status(400).send(e);
   }
 
})

//Retorna o treino de guitarra mais recente
router.get('/treinos/newest', async( req, res) => {
   
   try{

      let tabela = await Treino.find({}).sort({_id:-1}).limit(1);
      const tabela_id = tabela[0]._id

      const tempos =  await Tempo.find({ tabela : tabela_id });
      tabela.tempos = tempos;
      res.status(200).send(tabela);

   } catch (e) {
      console.log(e);
      res.status(500).send();
   }

})

//Deleta um treino de guitarra
router.delete('/treino/:id', async( req, res) => {
   try {

      const treino = await Treino.findOneAndDelete({ _id: req.params.id });

      if(!treino) {
         res.status(404).send();
      }

      res.send(treino);

   } catch (e) {
      console.log(e);
      res.status(500).send(e);
   }
})

//Encontra uma tabela por ID
router.get('/treino/:id', async (req, res) => {
   try {

      const treino = await Treino.findOne({ _id: req.params.id});

      if(!treino) {
         res.status(404).send();
      }

      res.send(treino);
      
   } catch (e) {
      console.log(e);
      res.status(500).send(e);
   }
})

//Atualiza uma tabela de guitarra
router.patch('/treino/:id', async( req, res ) => {
   const updates = Object.keys(req.body);
   
   try {
      const treino = await Treino.findOne({ _id: req.params.id});

      if(!treino) {
         res.status(404).send();
      }

      updates.forEach(update=> treino[update] = req.body[update]);

      await treino.save();
      
      res.send(treino);

   } catch (error) {
      console.log(e);
      res.status(500).send(e);
   }
})

module.exports = router;

// router.post('/treino', async (req, res) => {
//     // const task = new Task(req.body);
//     console.log(req);
//     // // Solution 2 with owner id 
//     // const task = new Task({
//     //     ...req.body,
//     //     owner: req.user._id
//     // });  

//     // try {
//     //     await task.save();
//     //     //if task is saved send 201 response
//     //     res.status(201).send(task);
//     // } catch (e) {
//     //     res.status(400).send(e);
//     // }
// });