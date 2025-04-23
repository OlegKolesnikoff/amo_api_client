const client = require('./client');

module.exports = {
  async addComplex(auth, payload) {
    const url = `https://${auth.domain}/api/v4/leads/complex`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      body: JSON.stringify(payload),
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async updateLead(auth, payload, id) {
    const url = `https://${auth.domain}/api/v4/leads/${id}`;
    const params = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      body: JSON.stringify(payload),
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },
};
