console.log('network.js is loading...');

const network = require('network');
const si = require('systeminformation');

const exceptions = require('../exceptions');

const log = (name, req, res) => {
  console.log(`Requested by <${req.ip}> <${req.method}> <${req.originalUrl}> (${name})`);
};

const getGateway = (req, res) => {
  log(getGateway.name, req, res);
  let gateway = 'ok';
  /*
  let gateway = network.get_gateway_ip((err, ip) => {
    return err || ip;
  });*/

  si.networkStats().then(ns => {
    console.log(ns);
  });

  //console.log(gateway);

  if (typeof gateway === 'undefined') return res.sendStatus(404);
  console.log(gateway);
  return res.send(gateway);
};

const getStats = () => {
  return si.networkStats().then(ns => {
    //console.log(ns[0]);
    return ns[0];
  });
};

const add = (req, res) => {
  console.log('add');
  //console.log(req.body);
  const client = { ...req.body };
  clients.push(client);
  return res.sendStatus(200);
};

const update = (req, res) => {
  console.log('update');
  const ip = req.params.ip;
  const download = req.body.download;
  const upload = req.body.upload;
  const client = clients.find(c => c.ip === ip);
  if (client === 'undefined') return res.sendStatus(404);
  client.download = download;
  client.upload = upload;
  //console.log(client);
  return res.sendStatus(200);
};

module.exports = {
  getGateway,
  getStats
};
