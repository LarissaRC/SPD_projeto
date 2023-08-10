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

      const { items } = response.data;
      const topArtists = items.map(({ name, id }) => {
          return { name, id };
      });

      console.log(topArtists);
      
      dispach({ type:reducerCases.SET_TOP_ARTISTS, topArtists });
      }
      getUserTopArtists();
  }, [token, dispach]);

return(
  <Container>
    <p>Top Artists:</p>
    <ul>
      {
        topArtists.map(({ name, id }) => {
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

export default TopArtists;