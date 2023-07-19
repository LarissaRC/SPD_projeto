const axios = require('axios');

const accessToken = 'BQAQE3u2P7Vi1t9KNUAadkk64Felg2zp-H1pVdT0ZXyEznzFkm5W7bfHlIDloy5L7ChxgJJZ5qdBwhqQ06KlaEWoLpYOeA2c3gTwEEgB54CD7ZlqM6U';

const options = {
  method: 'GET',
  url: 'https://api.spotify.com/v1/me',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};

axios(options)
  .then(response => {
    console.log('Perfil do usuário:', response.data);
  })
  .catch(error => {
    console.error('Erro ao obter o perfil do usuário:', error);
  });