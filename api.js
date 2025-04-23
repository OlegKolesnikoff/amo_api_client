const chatApi = require('./services/chat');
const authApi = require('./services/client');
const accountApi = require('./services/account');
const leadApi = require('./services/leads');
const contactApi = require('./services/contacts');
const fieldApi = require('./services/fields');
const userApi = require('./services/users');
const pipleneApi = require('./services/pipelines');
const tagApi = require('./services/tags');

module.exports = {
  chatApi,
  authApi,
  accountApi,
  leadApi,
  contactApi,
  fieldApi,
  userApi,
  pipleneApi,
  tagApi,
};

