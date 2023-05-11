import fs from 'fs';

const config = {
    http: {
        port: process.env.HTTP_PORT || 3000,
    },
    telnet: {
        port: process.env.TELNET_PORT || 2323,
    },
    ssh: {
        port: process.env.SSH_PORT || 2222,
        privateKey: process.env.SSH_PRIVATE_KEY || 'keys/ssh_private_key'
    },
};

// Load the SSH private key into the configuration
config.ssh.privateKey = fs.readFileSync(config.ssh.privateKey, 'utf-8');

export default config;