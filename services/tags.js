const client = require('./client');

module.exports = {
  async getTags(auth, entity) {
    const url = `https://${auth.domain}/api/v4/${entity}/tags`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.tags) {
      return result?._embedded?.tags?.map((tag) => ({ id: tag.id, name: tag.name }));
    }
  },
};
