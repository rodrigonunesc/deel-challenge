const { Op } = require("sequelize");
const { CONTRACT_STATUS } = require("../../shared/constants");
const { checkIfContractExistsValidator } = require("./validators/business");

async function getContractById({ id, profile, Contract }) {
  const contract = await Contract.findOne({ where: { id, ContractorId: profile.id } });
  checkIfContractExistsValidator(contract);
  return contract;
}

async function getContracts({ profile, Contract }) {
  const contracts = await Contract.findAll({ 
    where: {
      status: {
        [Op.ne]: CONTRACT_STATUS.TERMINATED
      },
      [Op.or]: [
        { ContractorId: profile.id },
        { ClientId: profile.id }
      ]
    }
  });
  return contracts;
}

module.exports = {
  getContractById,
  getContracts,
};