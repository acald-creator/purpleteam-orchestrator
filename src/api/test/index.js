const { Test } = require('./models');
const routes = require('./routes');

const applyRoutes = (server) => {
  // Plugin with multiple routes.  
  server.route(routes);
};

module.exports = {
  name: 'testDomainPlugin',
  version: '1.0.0',
  register: async (server, options) => {
    // Todo: KC: Configure model.
    const { testers } = options;
    const model = new Test({ testers });
    server.app.model = model; // eslint-disable-line no-param-reassign
    applyRoutes(server);
    console.log(`The options passed to testDomainPlugin were: ${options}.`); // eslint-disable-line no-console
  }

};
