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

      //console.log(topTracks);
      
      dispach({ type:reducerCases.SET_TOP_TRACKS, topTracks });
      }
      getUserTopTracks();
  }, [token, dispach]);

return(
  <Container>
    <h3>Músicas mais ouvidas</h3>
    <div className="tracks">
    {
        topTracks.map(({ name, id }) => {
            return (
                <div className="track" key={id}>
                    <img
                        src="https://i.scdn.co/image/ab67616d0000b273ba9d3d1bf1711c22915b68b8"
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

export default TopTracks;