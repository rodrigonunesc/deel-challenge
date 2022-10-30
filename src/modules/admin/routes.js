const express = require('express');
const adminController = require('./controller');
const adminRouter = express.Router();

adminRouter.get('/best-profession', adminController.getBestProfession);
adminRouter.get('/best-clients', adminController.getBestClients);

module.exports = adminRouter;