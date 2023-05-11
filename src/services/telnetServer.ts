import { TelnetSocket } from 'telnet-stream';
import { createServer } from 'net';
import dns from 'dns/promises';
import config from '../config/services';

const telnetServer = createServer(async(socket) => {
  const telnetSocket = new TelnetSocket(socket);
  const clientIp = socket.remoteAddress;
  const clientHostname = clientIp ? await dns.reverse(clientIp).catch(() => clientIp) : 'unknown';
  console.log(`Telnet connection from (${clientIp}) - ${clientHostname}`);

  console.log(`Telnet connection from (${clientIp})`);

  telnetSocket.write('Welcome to the BBS!\r\n');

  // Your BBS interaction logic goes here
  telnetSocket.on('data', (data) => {
    // Handle user input, e.g., display a menu or process commands
    telnetSocket.write(`You entered: ${data.toString()}\r\n`);
  });
});

telnetServer.listen(config.telnet.port, () => {
  console.log(`Telnet server listening on port ${config.telnet.port}`);
});
