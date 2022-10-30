const express = require('express');
const jobController = require('./controller');
const jobRouter = express.Router();

jobRouter.get('/unpaid', jobController.getUnpaidJobs);
jobRouter.post('/:job_id/pay', jobController.pay);

module.exports = jobRouter;