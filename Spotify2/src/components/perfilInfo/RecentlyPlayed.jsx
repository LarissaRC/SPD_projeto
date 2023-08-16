import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function RecentlyPlayed() {
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
    <h3>Últimas músicas escutadas</h3>
    <div className="tracks">
    {
        recentlyPlayed.map(({ name, id, image }) => {
            return (
                <div className="track" key={id}>
                    <img
                        src={image}
                        alt="track album"
                        className="album_img" />
                    <span className="track_name">{name}</span>
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

    .tracks {
        display: flex;
        justify-content: space-around;
        align-itens: center;
    }

    .track {
        width: 140px;
        height: 170px;
        justify-content: center;
        align-itens: center;

        border: 2px #888 solid;
        border-radius: 15px;
    }

    .album_img {
        display: flex;
        margin: 10px auto;
        width: 100px;
        height: 100px;
    }

    .track_name {
        display: flex;
    }
`;

export default RecentlyPlayed;