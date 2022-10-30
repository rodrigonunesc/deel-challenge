const { ForbiddenError } = require("../../../shared/errors");

function depositValidator({ contracts, currentBalance, valueToDeposit, userId, profileId }) {
  if (userId == profileId){
    throw new ForbiddenError();
  }

  if (currentBalance < valueToDeposit) {
    throw new ForbiddenError();
  }
  
  if (!contracts.length || !contracts[0].Jobs[0]) {
    return;
  } 

  const totalJobValueToBePaid = contracts[0].Jobs[0].dataValues.totalValueToBePaid;

  const LIMIT_FACTOR = 0.25;
  const depositLimit = totalJobValueToBePaid * LIMIT_FACTOR;

  if (valueToDeposit > depositLimit) {
    throw new ForbiddenError();
  }
}

module.exports = {
  depositValidator
};