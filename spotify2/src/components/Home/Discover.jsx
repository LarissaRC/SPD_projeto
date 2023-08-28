import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function Discover() {
  const [{ token, recommendedTracks }, dispach] = useStateProvider();
  useEffect(() => {
    const getRecommendedTracks = async() => {
    const response = await axios.get(`https://api.spotify.com/v1/recommendations?limit=20&market=BR&seed_artists=6HaGTQPmzraVmaVxvz6EUc`,
    {
        headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        },
    });
    console.log(response.data.tracks);

    const { items } = response.data.tracks;

    let tracks = [];
    for(let i = 0; i < 20; i++) {
      let name = response.data.tracks[i].name;
      let id = response.data.tracks[i].id;
      let link = response.data.tracks[i].external_urls.spotify;
      let image = response.data.tracks[i].album.images[1].url;
      tracks.push({ name, id, link, image});
    }

    const recommendedTracks = tracks.map(({ name, id, link, image }) => {
        return { name, id, link, image };
    });

    //console.log(recommendedTracks);
    
    dispach({ type:reducerCases.SET_RECOMMENDED_TRACKS, recommendedTracks });
    }
    getRecommendedTracks();
}, [token, dispach]);

return(
  <Container>
    <h3>Recomendações baseadas nas suas músicas mais ouvidas</h3>
    <div className="tracks">
    {
      recommendedTracks.map(({ name, id, link, image }, index) => {
        if(index < 5){
          return (
            <a href={link}>
              <div className="track" key={id}>
                  <img
                      src={image}
                      alt="track album"
                      className="album_img" />
                  <span className="track_name">{name}</span>
              </div>
            </a>
          )
        }
      })
    }
    </div>
    <div className="tracks">
    {
      recommendedTracks.map(({ name, id, link, image }, index) => {
        if(index > 4 && index < 10){
          return (
            <a href={link}>
              <div className="track" key={id}>
                  <img
                      src={image}
                      alt="track album"
                      className="album_img" />
                  <span className="track_name">{name}</span>
              </div>
            </a>
          )
        }
      })
    }
    </div>
    <div className="tracks">
    {
      recommendedTracks.map(({ name, id, link, image }, index) => {
        if(index > 9 && index < 15){
          return (
            <a href={link}>
              <div className="track" key={id}>
                  <img
                      src={image}
                      alt="track album"
                      className="album_img" />
                  <span className="track_name">{name}</span>
              </div>
            </a>
          )
        }
      })
    }
    </div>
    <div className="tracks">
    {
      recommendedTracks.map(({ name, id, link, image }, index) => {
        if(index > 14 && index < 20){
          return (
            <a href={link}>
              <div className="track" key={id}>
                  <img
                      src={image}
                      alt="track album"
                      className="album_img" />
                  <span className="track_name">{name}</span>
              </div>
            </a>
          )
        }
      })
    }
    </div>
  </Container>
);
}

const Container = styled.div`
margin: 0 20px;

h3 {
  margin-botton: 10px;
}

.tracks {
    display: flex;
    justify-content: space-around;
    align-itens: center;
    width: 100%;
    margin-bottom: 20px;
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

export default Discover;