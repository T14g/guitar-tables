const express = require('express');
const Treino = require('../models/Treino');
const router = new express.Router();

router.post('/treino', async(req, res) => {
   const jsonStr = JSON.stringify(req.body.json);
   const name = req.body.name;

   const obj = {
      'name' : name,
      'json' : jsonStr
   }

   const treino = new Treino(obj);
   
   try {
        await treino.save();
        //if task is saved send 201 response
        res.status(201).send(treino);
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