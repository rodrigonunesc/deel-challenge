const express = require('express');
const contractRouter = require('./modules/contract/routes');
const jobRouter = require('./modules/job/routes');
const balanceRouter = require('./modules/balance/routes');
const adminRouter = require('./modules/admin/routes');

const router = express.Router();


router.use('/contracts', contractRouter);
router.use('/jobs', jobRouter);
router.use('/balances', balanceRouter);
router.use('/admin', adminRouter);

module.exports = router;