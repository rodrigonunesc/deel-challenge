const { PROFILE_TYPE } = require("../../../shared/constants");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

function isClientValidator(profile) {
  if (profile.type !== PROFILE_TYPE.CLIENT) {
    throw new ForbiddenError();
  }
}

function jobExistsValidator(job) {
  if (!job) {
    throw new NotFoundError();
  }
}

function jobIsPaid(job) {
  if (job.paid === true) {
    throw new ForbiddenError();
  }
}

function clientAmountValidator(profile, amountToPay) {
  if (profile.balance < amountToPay) {
    throw new ForbiddenError();
  }
}

module.exports = {
  isClientValidator,
  clientAmountValidator,
  jobExistsValidator,
  jobIsPaid,
};