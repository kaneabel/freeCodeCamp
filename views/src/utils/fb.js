import $ from 'jquery';

export default {
  /**
   * Init
   *
   * @param appId
   * @returns {Promise<any>}
   */
  init(appId) {
    return new Promise((resolve) => {
      $.getScript('//connect.facebook.net/en_US/sdk.js', () => {
        window.FB.init({
          appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.0',
        });
        window.FB.getLoginStatus((response) => {
          if (response.status === 'unknown') {
            // https://stackoverflow.com/questions/34762428/fb-getloginstatus-is-returning-status-unknown-even-when-the-user-is-logged-in
            document.cookie.split(';').forEach((c) => {
              // eslint-disable-next-line
              document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';domain=stag.beeketing.com;path=/');
            });
          }

          resolve(response);
        });
      });
    });
  },

  /**
   * Page detail
   *
   * @param {*} id
   * @param {*} accessToken
   */
  detail(id, accessToken) {
    const params = {
      access_token: accessToken,
      fields: [
        'id',
        'access_token',
        'name',
        'picture',
      ],
    };

    return new Promise((resolve, reject) => {
      window.FB.api(`/${id}`, params, (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  },

  /**
   * Page roles
   * @param {*} id
   * @param {*} accessToken
   */
  roles(id, accessToken) {
    return new Promise((resolve, reject) => {
      window.FB.api(`/${id}/roles`, { access_token: accessToken }, (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  },

  /**
   * List pages
   *
   * @param {*} activeId
   * @param {*} accessToken
   */
  pages(activeId, accessToken, userId = null) {
    return new Promise((resolve, reject) => {
      window.FB.api('/me/accounts', async (response) => {
        try {
          const pages = await Promise.all(response.data.map(item => this.detail(item.id, accessToken)));
          const roles = await Promise.all(response.data.map(item => this.roles(item.id, item.access_token)));
          for (let i = 0; i < pages.length; i += 1) {
            roles[i].data.map((item) => {
              if (item.id === userId) {
                pages[i].role = item.role;
              }
              return item;
            });

            pages[i].active = pages[i].id === activeId && pages[i].role === 'Admin';
          }

          resolve(pages);
        } catch (error) {
          reject(error);
        }
      });
    });
  },

  /**
   * Whilelist domain
   * @param {*} domain
   * @param {*} accessToken
   */
  whilelistDomain(domain, accessToken) {
    const params = {
      access_token: accessToken,
      fields: ['whitelisted_domains'],
    };

    // eslint-disable-next-line
    window.FB.api('/me/messenger_profile', 'GET', params, (response) => {
      if (!response || response.error) {
        return false;
      }

      let whiteList = [];

      if (response.data.length) {
        whiteList = Object.assign({}, response.data[0].whitelisted_domains);
        whiteList = Object.values(whiteList);
      }

      const domains = Array.isArray(domain) ? domain : [domain];
      // eslint-disable-next-line
      const newDomains = domains.filter((item) => whiteList.indexOf(item) === -1);

      if (newDomains.length) {
        whiteList = whiteList.concat(...newDomains);

        const payload = {
          whitelisted_domains: whiteList,
        };

        window.FB.api(`/me/messenger_profile?access_token=${accessToken}`, 'POST', payload, res => res.result);
      } else {
        return true;
      }
    });
  },

  /**
   * Subscribe app for page
   * @param {*} id
   * @param {*} accessToken
   */
  subscribe(id, accessToken) {
    // eslint-disable-next-line
    window.FB.api(`/${id}/subscribed_apps`, 'GET', { access_token: accessToken }, (response) => {
      if (!response || response.error) {
        return false;
      }

      window.FB.api(`/${id}/subscribed_apps`, 'POST', { access_token: accessToken }, res => res);
    });
  },

  /**
   * Disconnect FB
   * Remove permission
   *
   */
  disconnect() {
    window.FB.api('/me/permissions', 'delete', (response) => {
      if (response) {
        return response;
      }
      return false;
    });
  },
};
