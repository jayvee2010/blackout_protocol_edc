// Live leaderboard server. Run:  node server.js   (needs Node 14+, no npm install)
// Admin (you, on this laptop):  http://localhost:3000/admin
// Players (same Wi-Fi):         http://<laptop-ip>:3000/   <- this is what the QR code opens
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const PORT = process.env.PORT || 3000;
const DB = path.join(__dirname, 'state.json');

let state = { groups: [], sessions: {}, settings: {}, updated: 0 };
try { state = JSON.parse(fs.readFileSync(DB, 'utf8')); } catch (e) {}

const lanUrls = () => Object.values(os.networkInterfaces()).flat()
  .filter(i => i && i.family === 'IPv4' && !i.internal)
  .map(i => `http://${i.address}:${PORT}/`);

const getLocalAddrs = () => {
  const addrs = new Set(['127.0.0.1', '::1', 'localhost']);
  try {
    Object.values(os.networkInterfaces()).flat().forEach(i => {
      if (i && i.address) addrs.add(i.address);
    });
  } catch (e) {}
  return addrs;
};

const isLocal = req => {
  const localSet = getLocalAddrs();
  const rawIp = req.socket.remoteAddress || '';
  const cleanIp = rawIp.replace(/^::ffff:/, '');
  return localSet.has(cleanIp) || cleanIp === '127.0.0.1' || cleanIp === '::1';
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  const send = (code, type, body) => {
    res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  };
  const sendFile = name => fs.readFile(path.join(__dirname, name), (err, data) =>
    err ? send(404, 'text/plain', name + ' not found next to server.js') : send(200, 'text/html; charset=utf-8', data));
  const url = req.url.split('?')[0];

  // Health check endpoint
  if (url === '/api/health') return send(200, 'application/json', JSON.stringify({ status: 'ok', time: Date.now() }));

  // Players poll this. "now" lets phones sync their clock to the laptop's.
  if (url === '/api/state' && req.method === 'GET')
    return send(200, 'application/json', JSON.stringify({ ...state, now: Date.now() }));

  // Only the laptop running the server (the admin) may write.
  if (url === '/api/state' && req.method === 'POST') {
    if (!isLocal(req)) return send(403, 'text/plain', 'Admin only');
    let body = '';
    req.on('data', c => { body += c; if (body.length > 5e6) req.destroy(); });
    req.on('end', () => {
      try {
        const d = JSON.parse(body);
        state = { groups: d.groups || [], sessions: d.sessions || {}, settings: d.settings || {}, updated: Date.now() };
        fs.writeFile(DB, JSON.stringify(state, null, 2), () => {});
        send(200, 'application/json', '{"ok":true}');
      } catch (e) { send(400, 'text/plain', 'Bad JSON'); }
    });
    return;
  }

  if (url === '/edc-logo.jpg' || url === '/logo.jpg' || url === '/logo.png' || url === '/logo.jpeg') {
    return fs.readFile(path.join(__dirname, 'edc-logo.jpg'), (err, data) =>
      err ? send(404, 'text/plain', 'Logo not found') : send(200, 'image/jpeg', data));
  }
  if (url === '/api/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('data: ' + JSON.stringify(state) + '\n\n');
    const interval = setInterval(() => {
      res.write('data: ' + JSON.stringify(state) + '\n\n');
    }, 1500);
    req.on('close', () => clearInterval(interval));
    return;
  }
  if (url === '/api/info') return send(200, 'application/json', JSON.stringify({ urls: lanUrls() }));
  if (url === '/admin' || url === '/admin.html') return isLocal(req) ? sendFile('admin.html') : send(403, 'text/plain', 'Admin only');
  if (url === '/panel' || url === '/AdministratorPanel.html') return isLocal(req) ? sendFile('AdministratorPanel.html') : send(403, 'text/plain', 'Admin only');
  if (url === '/' || url === '/index.html' || url === '/leaderboard' || url === '/leaderboard.html') return sendFile('leaderboard.html');
  send(404, 'text/plain', 'Not found');
}).listen(PORT, '0.0.0.0', () => {
  console.log('\n======================================================');
  console.log(' EDC / IEEE Live Event Server Running');
  console.log(' Admin panel : http://localhost:' + PORT + '/admin');
  console.log(' Leaderboard : http://localhost:' + PORT + '/');
  console.log(' LAN Players : ' + (lanUrls().join('  |  ') || 'connect to Wi-Fi first'));
  console.log('======================================================\n');
});
