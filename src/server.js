const Hapi = require('hapi');
const hapiJsonApi = require('@gar/hapi-json-api');
const config = require('config/config');
const orchestration = require('src/api/orchestration');

const server = Hapi.server({ port: config.get('host.port'), host: config.get('host.ip') });

const infrastructuralPlugins = [
  {
    plugin: hapiJsonApi,
    options: {}
  }
];
const domainPlugins = [
  {
    plugin: orchestration,
    options: {
      testers: config.get('testers')
    }
  }
];


module.exports = {

  registerPlugins: async () => {
    // Todo: KC: Add host header as `vhost` to the routes of the optional options object passed to `server.register`.
    // https://hapijs.com/tutorials/plugins#user-content-registration-options

    await server.register(infrastructuralPlugins.concat(domainPlugins));
  },
  start: async () => {
    await server.start();
    return server;
  }

};
