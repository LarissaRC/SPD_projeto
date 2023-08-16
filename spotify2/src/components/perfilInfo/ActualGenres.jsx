import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function ActualGenres() {
  const [{ token, recentlyPlayed }, dispach] = useStateProvider();
  useEffect(() => {
      const getRecentlyPlayed = async() => {
      const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=4",
      {
          headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          },
      });

      //console.log(response);

      const { items } = response.data;

      let tracks = [];
      for(let i = 0; i < 4; i++) {
        let name = items[i].track.name;
        let id = items[i].track.id;
        let image = items[i].track.album.images[1].url;
        tracks.push({ name, id, image});
      }

      const recentlyPlayed = tracks.map(({ name, id, image }) => {
          return { name, id, image };
      });

      //console.log(recentlyPlayed);
      
      dispach({ type:reducerCases.SET_RECENTLY_PLAYED, recentlyPlayed });
      }

      getRecentlyPlayed();
  }, [token, dispach]);

return(
  <Container>
    <h3>Gêneros musicais mais ouvidos ultimamente</h3>
    <div className="genres">
        <div className="genre">
            <span className="genre_name">Pop</span>
        </div>
        <div className="genre">
            <span className="genre_name">Indie Pop</span>
        </div>
        <div className="genre">
            <span className="genre_name">Rock Pop</span>
        </div>
        <div className="genre">
            <span className="genre_name">J-Pop</span>
        </div>
        <div className="genre">
            <span className="genre_name">City Pop</span>
        </div>
    </div>
  </Container>
);
}

const Container = styled.div`
    margin: 0 20px;

    .genres {
        display: flex;
        justify-content: space-around;
        align-itens: center;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    
    .genre {
    text-align: center;
    justify-content: center;
    background-color: #79db8b;
    border: 2px #000 solid;
    border-radius: 8px;
    width: 100px;
    height: 30px;
    }
`;

export default ActualGenres;