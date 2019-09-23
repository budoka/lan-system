const axios = require('axios');
const protocol = process.env.REACT_APP_SERVER_PROTOCOL;

const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;
const url = `${protocol}://${host}:${port}`;

const getClients = async () => {
  var endpoint = `${url}/api/clients`;

  const r = await axios
    .get(endpoint)
    .then(response => {
      //console.log(response.data);
      return response.data;
    })
    .catch(error => {
      return Promise.reject(error);
    })
    .finally(function() {});

  return r;
};

const clientServices = {
  getClients
};

export default clientServices;
