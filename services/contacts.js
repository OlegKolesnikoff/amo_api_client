const client = require('./client');

module.exports = {
  async bindChatAndContact(auth, payload) {
    const url = `https://${auth.domain}/api/v4/contacts/chats`;
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

  async updateContact(auth, payload, id) {
    const url = `https://${auth.domain}/api/v4/contacts/${id}`;
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
