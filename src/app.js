const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/', getProfile, router);

app.use(errorHandler);

module.exports = app;
