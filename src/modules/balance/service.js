const { Job } = require("../../model");
const sequelize = require('sequelize');
const { depositValidator } = require("./validators/business");


async function depositMoney({ depositMoneyDto, userId, profile, Profile, Contract }) {
  const transaction = await Profile.sequelize.transaction();
  try {
    const contracts = await Contract.findAll({
      where: { ClientId: profile.id, },
      include: [
        {
          model: Job,
          attributes: [
            'paid',
            [sequelize.fn('sum', sequelize.col('price')), 'totalValueToBePaid']
          ],
          where: { paid: false },
        }
      ]
    });

    depositValidator({
      contracts, 
      currentBalance: profile.balance, 
      valueToDeposit: depositMoneyDto.value,
      userId,
      profileId: profile.id
    });

    const promises = [
      Profile.update({
        balance: sequelize.literal('balance - ' + depositMoneyDto.value)
      }, { where: { id: profile.id }, transaction }),
      Profile.update({
        balance: sequelize.literal('balance + ' + depositMoneyDto.value)
      }, { where: { id: userId }, transaction }),
    ];
    await Promise.all(promises);
    await transaction.commit();
  } catch(error) {
    await transaction.rollback();
    throw error;
  }
}


module.exports = {
  depositMoney
};