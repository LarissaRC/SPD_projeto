import React from 'react';
import styled from "styled-components";

function FavoriteArtist() {

return(
  <Container>
    <h3>Artista favorito</h3>
    <div className="track">
        <div className="track_image">
            <img
                src="https://i.scdn.co/image/ab67616d0000b273ba9d3d1bf1711c22915b68b8"
                alt="track album"
                className="album_img" />
        </div>
        <div className="track_info">
            <p className="track_name">Nome da música aaaaa</p>
            <p className="artist_name">Artistas aaaaa</p>
        </div>
    </div>
  </Container>
);
}

const Container = styled.div`
  margin: 0 20px;
  width: 50%;

  .track {
    width: 300px;
    height: 140px;
    display: flex;
    justify-content: space-between;

    border: 2px #888 solid;
    border-radius: 15px;
  }

  .track_image {
    width: 40%;
  }

  .album_img {
      margin: 20px 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
  }

  .track_info {
    width: 60%;
    align-self: center;
  }

  .track_name {

  }
`;

export default FavoriteArtist;