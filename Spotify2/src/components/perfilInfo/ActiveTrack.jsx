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
        <p>Tocando agora: </p>
        {currentPlaying ? (
        <div>
            <img src={currentPlaying.image} alt="currentPlaying" />
            <h4>{currentPlaying.name}</h4>
            <h6>
                {currentPlaying.artists.join(", ")}
            </h6>
        </div>
        ) : (
            <div>
                <p>Nada por hora ;-;</p>
            </div>
        )}
    </Container>
  );
}

const Container = styled.div`
  
`;