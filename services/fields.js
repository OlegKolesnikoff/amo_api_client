const client = require('./client');

module.exports = {
  async getContactFields(auth) {
    const url = `https://${auth.domain}/api/v4/contacts/custom_fields`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async getFieldsByEntity(entity, auth) {
    const url = `https://${auth.domain}/api/v4/${entity}/custom_fields`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async addGroupFields(auth, entity, payload) {
    const url = `https://${auth.domain}/api/v4/${entity}/custom_fields/groups`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      body: JSON.stringify(payload),
    };
    const result = await client.fetcher(url, params, auth);
    return result?._embedded?.custom_field_groups?.[0];
  },

  async addFields(auth, entity, payload) {
    const url = `https://${auth.domain}/api/v4/${entity}/custom_fields`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      body: JSON.stringify(payload),
    };
    const result = await client.fetcher(url, params, auth);
    return result?._embedded?.custom_fields;
  },
};
