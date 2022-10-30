const express = require('express');
const balanceController = require('./controller');
const balanceRouter = express.Router();

balanceRouter.post('/deposit/:userId', balanceController.depositMoney);

module.exports = balanceRouter;