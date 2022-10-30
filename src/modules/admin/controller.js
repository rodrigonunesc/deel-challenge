const adminService = require('./service');

async function getBestProfession(req, res, next) {
  try {
    const { Profile, } = req.app.get('models');
    const bestProfession = await adminService.getBestProfession({
      Profile,
      startDate: req.query.start,
      endDate: req.query.end
    });
    res.json({ bestProfession });
  } catch (error) {
    next(error);
  }
}

async function getBestClients(req, res, next) {
  try {
    const { Contract } = req.app.get('models');
    const bestClients = await adminService.getBestClients({
      Contract,
      startDate: req.query.start,
      endDate: req.query.end,
      limit: req.query.limit
    });
    res.json(bestClients);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBestProfession,
  getBestClients
};