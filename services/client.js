module.exports = {
  CLIENT_SECRET: null,
  CLIENT_ID: null,
  AMO_INSTALL_URL: null,

  async installApp(payload) {
    const { code, referer } = payload;
    const url = `https://${referer}/oauth2/access_token`;
    const body = {
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.AMO_INSTALL_URL,
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const result = await this.fetcher(url, params);
    result['domain'] = referer;
    await this._setAppSettings(result);
    return result;
  },

  async refreshAccessToken(auth, isNewDomain = false) {
    const url = `https://${auth.domain}/oauth2/access_token`;
    const body = {
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token,
      redirect_uri: this.AMO_INSTALL_URL,
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const result = await this.fetcher(url, params);

    // обработка смена адреса портала
    if (result?.status == 404 && auth?.access_token && auth?.refresh_token && !isNewDomain) {
      const { access_token, refresh_token } = auth;
      const token_payload = access_token.split('.')[1];
      const token_parsed = JSON.parse(Buffer.from(token_payload, 'base64').toString());
      const newDomain = await this._getDomainByToken(token_parsed, refresh_token);

      if (newDomain?.domain) {
        await this._changeDomain(auth.domain, newDomain.domain);
        return await this.refreshAccessToken({ ...auth, domain: newDomain.domain }, true);
      }
    }

    if (result && result.access_token && result.refresh_token) {
      result['domain'] = auth.domain;
      await this._setAppSettings(result);
    }

    return result;
  },

  async _getDomainByToken(domain, refresh_token) {
    const { api_domain } = domain || {};

    if (!api_domain) {
      return null;
    }

    const url = `https://${api_domain}/oauth2/account/current/subdomain`;
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Refresh-Token': refresh_token,
      },
    };
    const result = await this.fetcher(url, params);
    return result;
  },

  async fetcher(url, params, auth, isAuth = false) {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const response = await fetch(url, params);

    if (response.status == 401 && auth && isAuth === false) {
      const updateAuth = await this.refreshAccessToken(auth);

      if (updateAuth?.access_token) {
        // eslint-disable-next-line require-atomic-updates
        params.headers.Authorization = `Bearer ${updateAuth.access_token}`;
        return this.fetcher(url, params, auth, true);
      }
    }

    if (response.headers.get('Content-Type')?.match(/json/gi)) {
      const result = await response.json();
      return result;
    } else {
      if (response.ok) return true;
      return false;
    }
  },

  async _setAppSettings(settings) {
    return settings;
  },

  async _changeDomain(old_domain, new_domain) {
    return new_domain;
  },
};
