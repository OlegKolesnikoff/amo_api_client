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

  async getContactFieldsByType(type, auth) {
    const url = `https://${auth.domain}/api/v4/contacts/custom_fields?filter[type][0]=${type}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);
    return result?._embedded?.custom_fields || [];
  },

  async getFieldsByEntity(entity, auth) {
    const fields = [
      'text',
      'numeric',
      'checkbox',
      'select',
      'multiselect',
      'date',
      'url',
      'textarea',
      'radiobutton',
      'streetaddress',
      'smart_address',
      'birthday',
      'date_time',
      'price',
      'category',
      'multitext',
      'monetary',
    ];
    const url = `https://${auth.domain}/api/v4/${entity}/custom_fields`;
    const queryParams = fields.map((field, index) => `filter[type][${index}]=${field}`).join('&');
    const urlWithParams = `${url}?${queryParams}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(urlWithParams, params, auth);
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
