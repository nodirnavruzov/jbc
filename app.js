'use strict'
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var app = express();
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv').config()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


// main routes
app.use('/api', routes)

// index route
app.use('/', (req, res) => {
  res.json({message: 'Have you lost anything?'})
})


// any routes that does not match above
app.get("*", (req, res) => {
  res.status(404).json({ message: 'Route Not Found.'})
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
      console.log('MongoDB connected...')
      app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
    }
  )
  .catch( error => {
    console.error(error)
})

