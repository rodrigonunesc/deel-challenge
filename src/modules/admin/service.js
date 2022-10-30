const { Op, Sequelize } = require("sequelize");
const { Contract, Job, Profile } = require("../../model");
const { PROFILE_TYPE, DEFAULT_LIMIT } = require("../../shared/constants");

async function getBestProfession({ Profile, startDate, endDate }) {
  const profiles = await Profile.findAll({
    where: {
      type: PROFILE_TYPE.CONTRACTOR,
    },
    group: 'profession',
    include: [{
      model: Contract,
      as: 'Contractor',
      include: [{
        model: Job,
        attributes: [
          'paid',
          'paymentDate',
          [Sequelize.fn('sum', Sequelize.col('price')), 'totalPriceByProfession']
        ],
        where: {
          paymentDate: {
            [Op.between]: [startDate, endDate]
          },
          paid: true,
        },
      }]
    }]
  });

  const profilesWithContracts = profiles.filter(p => p.Contractor.length > 0);

  if (!profilesWithContracts.length) {
    return null;
  }

  const profileWithBestProfession = profilesWithContracts.reduce((bestProfession, profile) => {
    const currentTotalPriceByProfession = profile.Contractor[0].Jobs[0].dataValues.totalPriceByProfession;
    const currentBestTotalPriceByProfession = bestProfession.Contractor[0].Jobs[0].dataValues.totalPriceByProfession;
    return currentTotalPriceByProfession > currentBestTotalPriceByProfession ? profile : bestProfession
  });
  return profileWithBestProfession.profession;
}

async function getBestClients({ Contract, startDate, endDate, limit = DEFAULT_LIMIT }) {
  const contracts = await Contract.findAll({
    group: 'ClientId',
    include: [{
      model: Job,
      attributes: [
        'paid',
        'paymentDate',
        'price',
        [Sequelize.fn('sum', Sequelize.col('price')), 'totalPaid'],
      ],
      where: {
        paymentDate: {
          [Op.between]: [startDate, endDate]
        },
        paid: true,
      },
    }, {
      model: Profile,
      as: 'Client',
      attributes: ['id', 'firstName', 'lastName'],
    }],
    order: [
      [Sequelize.fn('sum', Sequelize.col('price')), 'DESC']
    ],
  });
  return contracts.map(contract => ({
    id: contract.Client.id,
    fullName: `${contract.Client.firstName} ${contract.Client.lastName}`,
    paid: contract.Jobs[0].dataValues.totalPaid
  })).slice(0, limit);
}


module.exports = {
  getBestProfession,
  getBestClients
};