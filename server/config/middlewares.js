import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';

//initialize node environment initializer
dotenv.config();

//check for production
const isProduction = process.env.NODE_ENV === 'production';
// console.log(process.env.NODE_ENV);

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

    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: {},
            },
        });
    });
}