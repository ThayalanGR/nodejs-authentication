import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import errorHandler from 'errorhandler';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import Users from '../modules/user/model';

//initialize node environment initializer
dotenv.config();

//check for production
// const isProduction = process.env.NODE_ENV === 'production';

//setting up middlewares for express server
export default (app) => {

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({
    secret: 'nodejs-authentication',
    cookie: {
      maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
  }));


  //passport initialization
  passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  }, (email, password, done) => {
        Users.findOne({
        email
      })
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            errors: {
              'email or password ': 'is invalid'
            }
          });
        }
        return done(null, user);
      }).catch(done);
  }));


}
