const fieldsService = require('../services/fields');
const client = require('../services/client');

jest.mock('../services/client', () => ({
  fetcher: jest.fn(),
}));

describe('fieldsService.getFieldsByEntity', () => {
  it('requests all field types for specified entity', async () => {
    const auth = { domain: 'example.com', access_token: 'token' };
    client.fetcher.mockResolvedValue({});

    await fieldsService.getFieldsByEntity('contacts', auth);

    const expectedFields = [
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
    const baseUrl = `https://${auth.domain}/api/v4/contacts/custom_fields`;
    const queryParams = expectedFields
      .map((type, i) => `filter[type][${i}]=${type}`)
      .join('&');
    const urlWithParams = `${baseUrl}?${queryParams}`;
    const expectedParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.access_token}` },
    };

    expect(client.fetcher).toHaveBeenCalledWith(urlWithParams, expectedParams, auth);
  });
});
