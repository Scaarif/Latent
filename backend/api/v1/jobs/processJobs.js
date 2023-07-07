const mongoose = require('mongoose');
const { Agent, Tenant } = require('../models/User');
const bookHouseQueue = require('./queue');
const sendEmail = require('../utils/sendEmail');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/latent';

// Establish database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => console.log(err.message));

// Process jobs: Sends emails to both tenant and agent for house inspection;
bookHouseQueue.process(async (job) => {
  try {
    const {
      tenantId, agentId, houseDescription, houseAddress,
    } = job.data;
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) throw new Error('No tenant found');
    const agent = await Agent.findById(agentId);
    if (!agent) throw new Error('No agent found');

    const tenantMessage = `Hello ${tenant.firstName}\nYou have indicated interest in inspecting a house listed by ${agent.firstName}\n\nHouse details:\n\tAddress: ${houseAddress}\n\tDescription: ${houseDescription}\n\tAgent/Owner's contact: ${agent.phoneNumber}\n\nPlease kindly contact the agent\nThank you for choosing Latent for your housing services`;
    const agentMessage = `Hello ${agent.firstName}\nThere is a potential tenant by name ${tenant.firstName} who is interested in your house.\nHouse details:\n\tAddress: ${houseAddress}\n\tDescription: ${houseDescription}\n\nYour contact has been shared with the tenant\nThank you for choosing Latent for your housing services`;

    const mailOptions = [{
      from: 'Latent gideonobiasor@gmail.com',
      to: tenant.email,
      subject: 'House inspection',
      text: `${tenantMessage}`,
    },
    {
      from: 'Latent gideonobiasor@gmail.com',
      to: agent.email,
      subject: 'House inspection',
      text: `${agentMessage}`,
    }];
    console.log(mailOptions);
    mailOptions.forEach(async (mailOption) => {
      await sendEmail(mailOption);
    });
  } catch (err) {
    console.error(err.message);
  }
});