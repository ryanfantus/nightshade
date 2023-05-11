import fastify from 'fastify';
import config from '../config/services';

const server = fastify({ logger: true });

server.get('/', async (request, reply) => {
  return { message: 'Hello from the BBS API!' };
});

const start = async () => {
  try {
    await server.listen(config.http.port);
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port ?? config.http.port;
    server.log.info(`Server running at http://localhost:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
