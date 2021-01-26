const express = require('express');
const Treino = require('../models/Treino');
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