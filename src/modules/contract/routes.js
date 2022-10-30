const express = require('express');
const contractController = require('./controller');
const contractRouter = express.Router();

contractRouter.get('', contractController.getContracts);
contractRouter.get('/:id', contractController.getContractById);

module.exports = contractRouter;