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

  async getContactByChat(auth, id) {
    const url = `https://${auth.domain}/api/v4/contacts/chats?chat_id=${id}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.chats?.[0]?.contact_id) {
      return result?._embedded?.chats?.[0]?.contact_id;
    }

    return false;
  },

  /**
   * Получение контакта по ID
   * @param {Object} auth Данные авторизации
   * @param {number|string} id ID контакта
   * @returns {Promise<Object>} Данные контакта или null
   */
  async getById(auth, id) {
    const url = `https://${auth.domain}/api/v4/contacts/${id}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };

    try {
      const result = await client.fetcher(url, params, auth);
      return result;
    } catch (error) {
      // Если контакт не найден (код 404), вернем null вместо ошибки
      if (error.status === 404) {
        return null;
      }
      throw error; // Другие ошибки пробрасываем дальше
    }
  },
};
