require('app-module-path/register');
const server = require('src/server');

const init = async () => {
  await server.registerPlugins();
  const startedServer = await server.start();
  startedServer.log(['startup'], `purpleteam-orchestrator running at: ${startedServer.info.uri} in ${process.env.NODE_ENV} mode.`);
};

process.on('unhandledRejection', (err) => {
  console.log(err); // eslint-disable-line no-console
  process.exit(1);
});

init();
