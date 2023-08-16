import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constants";

export default function ActiveTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getActiveTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };
    getActiveTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentPlaying ? (
      <div>
        <h3>Usuário já está sintonizado de novo</h3>
          <div className="track">
            <img
                src={currentPlaying.image}
                alt="track album"
                className="album_img" />
            <span className="track_name">{currentPlaying.name}</span>
            <span className="artists_name">{currentPlaying.artists.join(", ")}</span>
          </div>
      </div>
      ) : (
        <div>
            <h3>Usuário não está ouvindo nada por hora</h3>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 20px;

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