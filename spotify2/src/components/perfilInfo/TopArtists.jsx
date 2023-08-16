import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function TopArtists() {
  const [{ token, topArtists }, dispach] = useStateProvider();
  useEffect(() => {
      const getUserTopArtists = async() => {
      const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=4`,
      {
          headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          },
      });
      //console.log(response);

      const { items } = response.data;
      
      let artists = [];
      for(let i = 0; i < 4; i++) {
        let name = items[i].name;
        let id = items[i].id;
        let image = items[i].images[1].url;
        artists.push({ name, id, image});
      }

      const topArtists = artists.map(({ name, id, image }) => {
          return { name, id, image };
      });

      console.log(topArtists);
      
      dispach({ type:reducerCases.SET_TOP_ARTISTS, topArtists });
      }
      getUserTopArtists();
  }, [token, dispach]);

return(
  <Container>
    <h3>Artistas mais ouvidas</h3>
    <div className="artists">
    {
        topArtists.map(({ name, id, image }) => {
            return (
                <div className="artist" key={id}>
                    <img
                        src={image}
                        alt="artist"
                        className="artist_img" />
                    <span className="artist_name">{name}</span>
                </div>
            )
        })
    }
    </div>
  </Container>
);
}

const Container = styled.div`
  margin: 0 20px;

  .artists {
      display: flex;
      justify-content: space-around;
      align-itens: center;
  }

  .artist {
      width: 140px;
      height: 170px;
      justify-content: center;
      align-itens: center;

      border: 2px #888 solid;
      border-radius: 15px;
  }

  .artist_img {
      display: flex;
      margin: 10px auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
  }

  .artist_name {
      display: flex;
  }
`;

export default TopArtists;