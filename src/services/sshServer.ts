import { Server } from 'ssh2';
import config from '../config/services';

const sshServer = new Server({
  // Replace with your own key pair
  hostKeys: [config.ssh.privateKey],
}, (client) => {
  client.on('authentication', (ctx) => {
    // Implement your authentication logic here
    ctx.accept(); // Accept all connections for this example
  }).on('ready', () => {
    client.on('session', (accept) => {
      const session = accept();
      session.on('pty', (accept, reject) => {
        accept();
      }).on('shell', (accept) => {
        const stream = accept();
        stream.write('Welcome to the BBS!\r\n');

        // Your BBS interaction logic goes here
        stream.on('data', (data: Buffer) => {
          // Handle user input, e.g., display a menu or process commands
          stream.write(`You entered: ${data.toString()}\r\n`);
        });
      });
    });
  });
}).listen(config.ssh.port, () => {
  console.log(`SSH server listening on port ${config.ssh.port}`);
});
