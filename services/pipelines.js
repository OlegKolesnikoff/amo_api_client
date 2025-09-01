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

  async getPipeline(pipelineId, auth) {
    const url = `https://${auth.domain}/api/v4/leads/pipelines/${pipelineId}`;
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const result = await client.fetcher(url, params, auth);
    return result;
  },

  async updateSourcePipeline(sourceId, pipelineId, auth) {
    // Источники и воронки в amoCRM - разные сущности
    // Для изменения привязки источника к воронке используем API источников
    const url = `https://${auth.domain}/api/v4/sources/${sourceId}`;

    const data = {
      pipeline_id: parseInt(pipelineId, 10),
    };

    const params = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const result = await client.fetcher(url, params, auth);
    return result;
  },
};
