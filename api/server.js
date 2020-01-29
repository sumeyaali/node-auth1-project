const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session') // install this library
const knexSessionStore = require('connect-session-knex')(session);

const configureMiddleware = require('./configure-middleware.js');


const dbConnenction = require('../data/dbConfig');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/usersRouter');

const server = express();


const sessionConfig = {
    name:"Coooooookies",
    secret: process.env.SESSION_SECRET || "Shhhh keep this a secret", 
    cookie: {
        maxAge: 1000 * 60 * 10, 
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionStore({
        knex: dbConnenction,
        tablename: 'sessions',
        sidfieldname:'sid',
        createTable: true,
        clearInterval: 60000,    
    })
}



server.use(helmet());
server.use(session(sessionConfig)) //turn on sessions
server.use(express.json());
server.use(cors());


configureMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({ api: "It's Working!" });
  });


module.exports = server;