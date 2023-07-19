const axios = require('axios');

const artistId = '1vVHevk2PD45epYnDi9CCc';
const accessToken = 'BQBgT0qea9mTj27HS3LCk4TfV9B8f3ve_Inxt1YXRLzVBgCaw0WR3J0wyK5Z9RCNUD0v2geEmyQKGtkqRnRyAEb85UZnDRqdVtbrWHIDTKUsgZMcoE8';

const options = {
  method: 'GET',
  url: `https://api.spotify.com/v1/artists/${artistId}`,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};

axios(options)
  .then(response => {
    console.log('Dados do artista:', response.data);
  })
  .catch(error => {
    console.error('Erro ao obter os dados do artista:', error);
  });