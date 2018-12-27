import express from 'express';
import dbconfig from './config/dbconfig';
import middlewares from './config/middlewares';
import {userRoute} from './modules';
import errorHandler from 'errorhandler';

//configuration variables
const PORT = process.env.PORT || 3000;

//initialize app
const app = express();

//initailize database
dbconfig();

//initialize middlewares
middlewares(app);

//routes
app.use('/api/user', [userRoute]);


const isProduction = process.env.NODE_ENV === 'production';


if (!isProduction) {
  app.use(errorHandler());
}

//Error handlers
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}
// console.log(process.env.NODE_ENV);

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


//listen to the port 
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`server started on port - ${PORT}`);
})
