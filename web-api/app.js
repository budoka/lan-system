// SERVER
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.SERVER_PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;

const path = require('path');
const express = require('express');
const app = express();

const api = require('./api');

app.use('/api', api);

const projectName = process.env.PROJECT_NAME;

const projectPath = path.join(__dirname.slice(0, __dirname.lastIndexOf(projectName)), projectName);
const devPath = path.join(projectPath, 'client', 'public');
const prodPath = path.join(projectPath, 'client', 'build');

const environmentPath = ENVIRONMENT === 'PRODUCTION' ? prodPath : devPath;

// PUBLIC
app.use(express.static(environmentPath));

app.get('/*', function(req, res) {
  res.redirect('/api/status');
});

app.listen(PORT, function() {
  console.log('\x1b[30m\x1b[47m%s\x1b[0m', `Path: ${environmentPath}`);
  console.log('\x1b[30m\x1b[43m%s\x1b[0m', `Environment: ${ENVIRONMENT}`);
  console.log('\x1b[30m\x1b[46m%s\x1b[0m', `Server running at port: ${PORT}`);
});
