const crypto = require('crypto');
const client = require('./client');

module.exports = {
  DOMAIN: 'https://amojo.amocrm.ru',
  AMO_CHANEL_ID: '',
  AMO_CHANEL_SECRET: '',
  HOOK_API_VERSION: 'v2',
  TITLE: '',

  async _call(path, method, body) {
    const url = this.DOMAIN + path;
    const params = this._makeHeaders(path, method, body);
    const result = await client.fetcher(url, params);
    return result;
  },

  /* Подключение канала к аккаунту */
  async connectChanel(account_id) {
    const payload = {
      account_id,
      hook_api_version: this.HOOK_API_VERSION,
      title: this.TITLE,
    };
    const result = await this._call(`/v2/origin/custom/${this.AMO_CHANEL_ID}/connect`, 'POST', payload);
    return result.scope_id;
  },

  /* Отключение канала чата в аккаунте */
  async disconnectChanel(account_id) {
    const payload = { account_id };
    const result = await this._call(`/v2/origin/custom/${this.AMO_CHANEL_ID}/disconnect`, 'DELETE', payload);
    return result;
  },

  /* Создание нового чата */
  async createChat(scope_id, payload) {
    const result = await this._call(`/v2/origin/custom/${scope_id}/chats`, 'POST', payload);
    return result;
  },

  /* Отправка, редактирование или импорт сообщения */
  async addMessage(scope_id, payload) {
    const result = await this._call(`/v2/origin/custom/${scope_id}`, 'POST', payload);
    return result;
  },

  /* Обновление статуса доставки сообщения */
  async statusMessage(scope_id, msgid, payload) {
    const result = await this._call(`/v2/origin/custom/${scope_id}/${msgid}/delivery_status`, 'POST', payload);
    return result;
  },

  /* Получение истории сообщений по чату */
  async getChatHistory(scope_id, conversation_id, offset = 0, limit = 50) {
    const result = await this._call(
      `/v2/origin/custom/${scope_id}/chats/${conversation_id}/history?offset=${offset}&limit=${limit}`,
      'GET'
    );
    return result;
  },

  /* Передача информации о печатании */
  async statusTyping(payload) {
    const result = await this._call(`/v2/origin/custom/${this.AMO_CHANEL_ID}/typing`, 'POST', payload);
    return result;
  },

  _makeHeaders(path, method, body = '') {
    body &&= JSON.stringify(body);
    const [cleanPath] = path.split('?');
    const date = new Date().toUTCString() || '';
    const content_type = 'application/json';
    const content_md5 = crypto.createHash('md5').update(body).digest('hex') || '';
    const secret = [method, content_md5, content_type, date, cleanPath].join('\n');
    const x_secret = crypto.createHmac('sha1', this.AMO_CHANEL_SECRET).update(secret).digest('hex');
    const headers = {
      method,
      headers: {
        Date: date,
        'Content-Type': content_type,
        'Content-MD5': content_md5,
        'X-Signature': x_secret,
      },
    };
    if (body) headers['body'] = body;
    return headers;
  },
};
