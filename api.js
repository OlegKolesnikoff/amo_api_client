const chatApi = require('./services/chat');
const authApi = require('./services/client');
const accountApi = require('./services/account');
const leadApi = require('./services/leads');
const contactApi = require('./services/contacts');
const fieldApi = require('./services/fields');
const userApi = require('./services/users');
const pipleneApi = require('./services/pipelines');
const tagApi = require('./services/tags');

const chatSettings = {
  DOMAIN: 'https://amojo.amocrm.ru',
  AMO_CHANEL_ID: '',
  AMO_CHANEL_SECRET: '',
  HOOK_API_VERSION: 'v2',
  TITLE: '',
};

const clientSettings = {
  CLIENT_SECRET: null,
  CLIENT_ID: null,
  AMO_INSTALL_URL: null,
};

Object.assign(chatApi, chatSettings);
Object.assign(authApi, clientSettings);

const settings = { ...chatSettings, ...clientSettings };

module.exports = {
  settings,
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
