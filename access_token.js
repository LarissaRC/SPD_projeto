const axios = require('axios');

const clientId = '853c6f6b5373432eb4016f28c0f9a676';
const clientSecret = '699559b654674d6788c28cf70248c9e8';

const authOptions = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
};

axios(authOptions)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao obter o token:', error);
  });