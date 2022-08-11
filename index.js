// load app dependencies
const express = require('express');
const logger = require('morgan');
const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');
const schemaValidation = require('./validation/schemaValidation.js');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.NODE_ENV || 3000;

// app configurations
app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/simpletest', async (req, res, next) => {
  const id = Math.ceil(Math.random() * 9999999);

  schemaValidation.schema
    .validateAsync(req.body)
    .then(() =>
      res.status(200).json({
        status: 'success',
        data: req.body,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'error',
        errorMessage: error.details[0].message,
      })
    );
});

// establish http server connection
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
