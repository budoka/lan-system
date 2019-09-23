console.log('client.js is loading...');

const exceptions = require('../exceptions');
const network = require('../network');

const clients = [];

const log = (name, req, res) => {
  console.log(`Requested by <${req.ip}> <${req.method}> <${req.originalUrl}> (${name})`);
};

const get = (req, res) => {
  log(get.name, req, res);
  const ip = req.params.ip;
  const client = clients.find(c => c.ip === ip);
  if (typeof client === 'undefined') return res.sendStatus(404);
  //console.log(client);
  return res.send(client);
};

const getAll = (req, res) => {
  log(getAll.name, req, res);
  //console.log(clients);
  return res.send(clients);
};

const add = async (req, res) => {
  log(add.name, req, res);
  //console.log(req.body);
  let download = 0;
  let upload = 0;

  await network.getStats().then(data => {
    //console.log(data);
    download = data.rx_sec;
    upload = data.tx_sec;
  });

// req.body = { name: 'facu' , info: 'xd' }

  const client = { ...req.body, download, upload };

  clients.push(client);
  return res.sendStatus(200); 

  /*
    const stats = network.getStats().then(data => {
    console.log(data);
    const download = data.rx_sec;
    const upload = data.tx_sec;
    console.log(download);

    const client = { ...req.body, download, upload };
    clients.push(client);
    return res.sendStatus(200);
  });
  */
};

const update = (req, res) => {
  log(update.name, req, res);
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
  get,
  getAll,
  add,
  update
};
