const client = require('./client');

module.exports = {
  async getUsers(auth) {
    const url = `https://${auth.domain}/api/v4/users`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.users) {
      return result?._embedded?.users?.map((user) => ({ id: user.id, name: user.name, email: user.email }));
    }
  },

  async getUser(userId, auth) {
    const url = `https://${auth.domain}/api/v4/users/${userId}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result) {
      return { id: result.id, name: result.name, email: result.email };
    }
  },

  async getUserWithAmojo(userId, auth) {
    const url = `https://${auth.domain}/api/v4/users/${userId}?with=amojo_id`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);
    if (result) {
      return { id: result.id, name: result.name, email: result.email, amojo_id: result.amojo_id };
    }
    return null;
  }
};
