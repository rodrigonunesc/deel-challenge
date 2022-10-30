const { NotFoundError } = require("../../../shared/errors");

function checkIfContractExistsValidator(contract) {
  if (!contract) {
    throw new NotFoundError();
  }
}

module.exports = {
  checkIfContractExistsValidator,
};