const client = require('./client');

module.exports = {
  async getPipelines(auth) {
    const url = `https://${auth.domain}/api/v4/leads/pipelines`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);

    if (result?._embedded?.pipelines) {
      return (
        result?._embedded?.pipelines?.map((pipe) => ({
          id: pipe.id,
          name: pipe.name,
          statuses: pipe._embedded?.statuses,
        })) || []
      );
    }
  },
};
