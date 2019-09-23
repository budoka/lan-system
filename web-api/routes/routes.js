var express = require('express');

var Router = express.Router();

const client = require('../client');

Router.get('/gateway', (req, res) => {
  //network.getGateway(req, res);
})

Router.get('/clients', (req, res) => {
  //console.log(req.accepts('application/png'))
  client.getAll(req, res); 
})

Router.get('/clients/:ip', (req, res) => {
  client.get(req, res);
})

Router.post('/clients', (req, res) => {
  client.add(req, res);
})

Router.put('/clients/:ip', (req, res) => {
  client.update(req, res);
})

/*router.post('/test', (req, res) => {
  database.getProjects(req, res);
});*/

module.exports = Router;
