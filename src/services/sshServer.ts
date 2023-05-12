import ssh2, { Connection } from 'ssh2';
const { Server } = ssh2;

import dns from "dns/promises";
import config from "../config/services.js";

export async function startSshServer() {
  const sshServer = new Server(
    {
      // Load the SSH private key from the configuration
      hostKeys: [config.ssh.privateKey],
    },

    async (client: Connection) => {
      const clientIp = (client as any)._sock.remoteAddress;
      const clientHostname = clientIp
        ? await dns.reverse(clientIp).catch(() => clientIp)
        : "unknown";
      console.log(`SSH connection from (${clientIp}) - ${clientHostname}`);

      client
        .on("authentication", (ctx) => {
          // Implement your authentication logic here
          ctx.accept(); // Accept all connections for this example
        })
        .on("ready", () => {
          client.on("session", (accept) => {
            const session = accept();
            session
              .on("pty", (accept, reject) => {
                accept();
              })
              .on("shell", (accept) => {
                const stream = accept();
                stream.write("Welcome to the BBS!\r\n");

                // Your BBS interaction logic goes here
                stream.on("data", (data: Buffer) => {
                  // Handle user input, e.g., display a menu or process commands
                  stream.write(`You entered: ${data.toString()}\r\n`);
                });
              });
          });
        });
    }
  ).listen(config.ssh.port, () => {
    console.log(`SSH server listening on port ${config.ssh.port}`);
  });
}
