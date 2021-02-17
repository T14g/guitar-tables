const express = require('express');
//Ensures that mongose runs and connects to the database
require('./db/mongoose');

var cors = require('cors');

const treinoRouter = require('./routers/treinos');
const tempoRouter = require('./routers/tempos');
const tipoRouter = require('./routers/tipo');

const app = express();

const port = process.env.PORT ;

//Parses incoming request with json to objects
app.use(cors());
app.use(express.json());
app.use(treinoRouter);
app.use(tempoRouter);
app.use(tipoRouter);


app.listen(port, () => {
    console.log("Server Running on Port " + port);
}); 