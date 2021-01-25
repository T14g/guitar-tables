const express = require('express');
const treino = require('../models/Treino');
const router = new express.Router();

router.post('/treino', async(req, res) => {

   console.log(req);

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