const { Op, Sequelize } = require("sequelize");
const { Contract } = require("../../model");
const { CONTRACT_STATUS } = require("../../shared/constants");
const { isClientValidator, clientAmountValidator, jobExistsValidator, jobIsPaid } = require("./validators/business");


async function getUnpaidJobs({ Job }) {
  const unpaidJobs = await Job.findAll({
    include: [{
      model: Contract,
      attributes: ['status'],
      where: {
        status: CONTRACT_STATUS.IN_PROGRESS
      }
    }],
    where: {
      paid: false
    },
  });
  return unpaidJobs;
}

async function pay({ profile, jobId, Job, Profile }) {
  const transaction = await Job.sequelize.transaction();
  try {
    isClientValidator(profile);
    const jobToBePaid = await Job.findByPk(jobId, {
      include: [{
        model: Contract,
        attributes: ['status', 'ContractorId', 'ClientId'],
        where: {
          status: {
            [Op.ne]: CONTRACT_STATUS.TERMINATED
          }
        }
      }]
    });
    jobExistsValidator(jobToBePaid);
    jobIsPaid(jobToBePaid);
    clientAmountValidator(profile, jobToBePaid.price);
    const promises = [];
    promises.push(
      Profile.update({
        balance: Sequelize.literal('balance - ' + jobToBePaid.price)
      }, { where: { id: jobToBePaid.Contract.ClientId }, transaction })
    );
    promises.push(
      Profile.update({
        balance: Sequelize.literal('balance + ' + jobToBePaid.price)
      }, { where: { id: jobToBePaid.Contract.ContractorId }, transaction }),
    );
    promises.push(
      Job.update({
        paid: true,
        paymentDate: new Date()
      }, { where: { id: jobId }, transaction })
    )

    await Promise.all(promises);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  getUnpaidJobs,
  pay,
};