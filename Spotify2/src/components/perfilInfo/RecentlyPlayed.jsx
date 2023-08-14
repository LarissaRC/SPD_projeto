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
        tracks.push({ name, id});
      }

      const recentlyPlayed = tracks.map(({ name, id }) => {
          return { name, id };
      });

      //console.log(recentlyPlayed);
      
      dispach({ type:reducerCases.SET_RECENTLY_PLAYED, recentlyPlayed });
      }

      getRecentlyPlayed();
  }, [token, dispach]);

return(
  <Container>
    <p>Recently played:</p>
    <ul>
    {
        recentlyPlayed.map(({ name, id }) => {
            return (
                <li key={id}>{name}</li>
            )
        })
    }
    </ul>
  </Container>
);
}

const Container = styled.div`

`;

export default RecentlyPlayed;