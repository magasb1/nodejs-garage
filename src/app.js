
const express = require('express')
//const { PrismaClient } = require('@prisma/client')
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//const prisma = new PrismaClient()
const app = express()

// enable logging
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api/v1', routes);

const server = app.listen(process.env.APP_PORT || 3001, () => {
    console.log(`🚀 Server ready at: http://localhost:${process.env.APP_PORT}`)
})