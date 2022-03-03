var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv').config()

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express.',
    contact: {
      name: 'JBC ',
      url: '',
    },
  },
  servers: [
    {
      url: `http://${process.env.HOST}:${process.env.PORT}`,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// main routes
app.use('/api', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// index route
app.use('/', (req, res) => {
  res.json({message: 'Have you lost anything?'})
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// any routes that does not match above
app.get("*", (req, res) => {
  res.status(404).json({ message: 'Route Not Found.'})
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected...')
    app.listen(process.env.PORT, process.env.HOST, () => console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`))
    }
  )
  .catch( error => {
    console.error(error)
})

