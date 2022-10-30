const jobService = require('./service');

async function getUnpaidJobs(req, res, next) {
  try {
    const { Job } = req.app.get('models');
    const unpaidJobs = await jobService.getUnpaidJobs({ Job });
    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
}

async function pay(req, res, next) {
  try {
    const { Job, Profile } = req.app.get('models');
    const { profile } = req;
    const { job_id } = req.params;
    const jobs = await jobService.pay({ profile, Profile, Job, jobId: job_id });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUnpaidJobs,
  pay,
};