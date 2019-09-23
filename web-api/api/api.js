console.log('api.js is loading...');

const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('../routes');

const api_info = {
  name: process.env.API_NAME,
  version: process.env.API_VERSION,
  date: process.env.API_DATE
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Methods', 'Access-Control-Request-Headers'],
    credentials: true,
    enablePreflight: true
  })
);

router.options('*', cors());

router.get('/status', function(req, res) {
  const app = req.app; // get app object
  res.send( 
    `API - STATUS: <b>RUNNING</b><br><br>NAME: ${api_info.name}<br>VERSION: ${api_info.version}<br>DATE: ${
      api_info.date
    }`
  );
});

router.use('', routes);

module.exports = router;
