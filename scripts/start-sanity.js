const net = require('net');
const { spawn } = require('child_process');

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => server.close(() => resolve(true)));
    server.listen(port, '127.0.0.1');
  });
}

async function findFreePort(startPort = 3333, maxPort = 3500) {
  for (let port = startPort; port <= maxPort; port++) {
    if (await isPortFree(port)) {
      return port;
    }
  }
  throw new Error(`Aucun port libre trouvé entre ${startPort} et ${maxPort}`);
}

function runSanity(port) {
  return new Promise((resolve, reject) => {
    console.log(`Tentative de lancement de Sanity sur http://localhost:${port}`);

    const proc = spawn('npx', ['sanity', 'dev', '--port', `${port}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let stderr = '';
    proc.stdout.on('data', (chunk) => process.stdout.write(chunk));
    proc.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(chunk);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        return resolve(port);
      }
      const busy = /already in use|Adress already in use|EADDRINUSE/i.test(stderr);
      if (busy) {
        return reject(new Error('PORT_IN_USE'));
      }
      reject(new Error(`Sanity arrêtée (code ${code})`));
    });

    proc.on('error', (err) => reject(err));
  });
}

async function run() {
  let port = 3333;
  const limit = 3500;

  while (port <= limit) {
    const free = await isPortFree(port);
    if (!free) {
      port++;
      continue;
    }

    try {
      const startedPort = await runSanity(port);
      console.log(`Sanity Studio lancé sur http://localhost:${startedPort}`);
      return;
    } catch (error) {
      if (error.message === 'PORT_IN_USE') {
        console.log(`Port ${port} occupé, tentative sur ${port + 1} ...`);
        port++;
        continue;
      }
      console.error('Impossible de lancer Sanity Studio :', error);
      process.exit(1);
    }
  }

  console.error(`Aucun port libre trouvé entre 3333 et ${limit}.`);
  process.exit(1);
}

run();
