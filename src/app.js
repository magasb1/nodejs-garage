const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const exphbs = require("express-handlebars");
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");

const config = require('./config/config')
const logger = require('./config/logger')
const morgan = require('./config/morgan');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express()

// enable logging
app.use(morgan);

// set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "'unsafe-inline'"], 
        styleSrc: ["'self'", "'unsafe-inline'"], 
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"], 
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"]
      },
      reportOnly: true
    }
  }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors({
  option: 'http://localhost:3000'
}));
app.options('*', cors());

// enable cookie parser
app.use(cookieParser());

// view engine
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs"
    })
);
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, "../public")));

// v1 api routes
app.use("/", require("./routes/index"));
app.use('/api/v1', require('./routes/v1'));

const server = app.listen(config.port || 3000, () => {
    logger.info(`Server ready at: http://localhost:${config.port}`)
})