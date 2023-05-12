import { startApiServer } from './api/api.js';
import { startSshServer } from './services/sshServer.js';
import { startTelnetServer } from './services/telnetServer.js';
import { startSysopConsole } from './bbs/sysop.js';

async function main() {
  startApiServer();
  startSshServer();
  startTelnetServer();
  await startSysopConsole();
}

main();
