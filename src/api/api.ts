import fastify from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (request, reply) => {
  return { message: 'Hello from the BBS API!' };
});

const start = async () => {
  try {
    await server.listen(3000);
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port ?? 3000;
    server.log.info(`Server running at http://localhost:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
