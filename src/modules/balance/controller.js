const balanceService = require('./service');

async function depositMoney(req, res, next) {
  try {
    const { Profile, Contract } = req.app.get('models');
    const { profile } = req;
    const { userId } = req.params;
    const { body: depositMoneyDto } = req;
    await balanceService.depositMoney({ depositMoneyDto, userId, profile, Profile, Contract });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  depositMoney,
};