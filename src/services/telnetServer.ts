import { TelnetSocket } from 'telnet-stream';
import { createServer } from 'net';

const telnetServer = createServer((socket) => {
  const telnetSocket = new TelnetSocket(socket);

  telnetSocket.write('Welcome to the BBS!\r\n');

  // Your BBS interaction logic goes here
  telnetSocket.on('data', (data) => {
    // Handle user input, e.g., display a menu or process commands
    telnetSocket.write(`You entered: ${data.toString()}\r\n`);
  });
});

telnetServer.listen(2323, () => {
  console.log('Telnet server listening on port 2323');
});