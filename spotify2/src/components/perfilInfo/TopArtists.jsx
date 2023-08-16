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
      const topArtists = items.map(({ name, id }) => {
          return { name, id };
      });

      //console.log(topArtists);
      
      dispach({ type:reducerCases.SET_TOP_ARTISTS, topArtists });
      }
      getUserTopArtists();
  }, [token, dispach]);

return(
  <Container>
    <h3>Artistas mais ouvidas</h3>
    <div className="artists">
    {
        topArtists.map(({ name, id }) => {
            return (
                <div className="artist" key={id}>
                    <img
                        src="https://i.scdn.co/image/ab67616d0000b273ba9d3d1bf1711c22915b68b8"
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