import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function TopTracks() {
  const [{ token, topTracks }, dispach] = useStateProvider();
  useEffect(() => {
      const getUserTopTracks = async() => {
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=4`,
      {
          headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          },
      });

      const { items } = response.data;
      const topTracks = items.map(({ name, id }) => {
          return { name, id };
      });

      console.log(topTracks);
      
      dispach({ type:reducerCases.SET_TOP_TRACKS, topTracks });
      }
      getUserTopTracks();
  }, [token, dispach]);

return(
  <Container>
    <p>Top Tracks:</p>
    <ul>
      {
        topTracks.map(({ name, id }) => {
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

export default TopTracks;