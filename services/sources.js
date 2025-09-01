const client = require('./client');

const SOURCES_API_URL = '/api/v4/sources';

module.exports = {
  async getSource(externalId, auth) {
    const url = `https://${auth.domain}${SOURCES_API_URL}?filter[external_id]=${externalId}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.sources) return result?._embedded?.sources[0];
  },

  async createSource(source, auth) {
    const url = `https://${auth.domain}${SOURCES_API_URL}`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([source]),
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.sources) return result?._embedded?.sources[0];
  },

  async updateSource(sourceId, source, auth) {
    const url = `https://${auth.domain}${SOURCES_API_URL}/${sourceId}`;
    const params = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(source),
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async deleteSource(sourceId, auth) {
    const url = `https://${auth.domain}${SOURCES_API_URL}/${sourceId}`;
    const params = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async getSources(auth) {
    const url = `https://${auth.domain}/api/v4/sources`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };

    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.sources) {
      return result._embedded.sources;
    }

    return [];
  },
};
