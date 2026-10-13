import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const port = Number(portFlag >= 0 ? args[portFlag + 1] : args.find(arg => arg.startsWith('--port='))?.split('=')[1] || 4200);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Usa un puerto válido: npm start -- --port 4201');
  process.exit(1);
}
const url = `http://127.0.0.1:${port}`;
const available = await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.once('error', error => error.code === 'EADDRINUSE' ? resolve(false) : reject(error));
  probe.listen(port, '127.0.0.1', () => probe.close(() => resolve(true)));
});
if (!available) {
  let sameApp = false;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    sameApp = response.ok && (await response.text()).includes('<title>Samuel · Una dulce espera</title>');
  } catch { /* Un servicio distinto puede ocupar el puerto. */ }
  if (sameApp) {
    console.log(`babySami ya está funcionando en ${url}\nPuedes abrir ese enlace. No hace falta iniciar otro servidor.`);
    process.exit(0);
  }
  console.error(`El puerto ${port} está ocupado por otro servicio.\nUsa otro puerto: npm start -- --port ${port === 4201 ? 4202 : 4201}`);
  process.exit(1);
}
const cli = fileURLToPath(new URL('../node_modules/@angular/cli/bin/ng.js', import.meta.url));
const child = spawn(process.execPath, [cli, 'serve', '--host', '127.0.0.1', ...args], { stdio: 'inherit' });
child.once('error', error => { console.error(error.message); process.exitCode = 1; });
child.once('exit', code => { process.exitCode = code ?? 0; });
