const client = require('./client');

module.exports = {
  async getAccountIdForChat(auth) {
    const url = `https://${auth.domain}/api/v4/account?with=amojo_id`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params);
    return result.amojo_id;
  },

  async getAccountIdUser(auth) {
    const url = `https://${auth.domain}/api/v4/account`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params);
    return result.id;
  },

  async getCurrentIdUser(auth) {
    const url = `https://${auth.domain}/api/v4/account`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params);
    return result.current_user_id;
  },
};
