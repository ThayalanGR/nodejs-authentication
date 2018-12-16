import express from 'express';
import dbconfig from './config/dbconfig';
import middlewares from './config/middlewares';

//configuration variables
const PORT = process.env.PORT || 3000;

//initialize app
const app = express();

//initailize database
dbconfig();

//initialize middlewares
middlewares(app);


//listen to the port 
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`server started on port - ${PORT}`);
} )