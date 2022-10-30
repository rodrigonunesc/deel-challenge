const contractService = require('./service');

async function getContractById(req, res, next) {
  try {
    const { Contract } = req.app.get('models')
    const { id } = req.params
    const { profile } = req;
    const contract = await contractService.getContractById({ id, profile, Contract });
    res.json(contract);
  } catch (error) {
    next(error);
  }
}

async function getContracts(req, res, next) {
  try {
    const { Contract } = req.app.get('models');
    const { profile } = req;
    await contractService.getContracts({ profile, Contract });
    res.status(200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContractById,
  getContracts,
};