import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from '../../utils/Constants';
import UserInfo from '../perfilInfo/UserInfo';
import TopTracks from '../perfilInfo/TopTracks';
import TopArtists from '../perfilInfo/TopArtists';
import RecentlyPlayed from '../perfilInfo/RecentlyPlayed';
import ActiveTrack from '../perfilInfo/ActiveTrack';
import FavoriteTrack from '../perfilInfo/FavoriteTrack';
import ActualVibe from '../perfilInfo/ActualVibe';
import FavoriteArtist from '../perfilInfo/FavoriteArtist';
import FavoriteAlbum from '../perfilInfo/FavoriteAlbum';
import ActualGenres from '../perfilInfo/ActualGenres';

function Perfil() {
    const [{ token }, dispach] = useStateProvider();
    useEffect(() => {
        const getUserId = async() => {
        const { data } = await axios.get('https://api.spotify.com/v1/me',
        {
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
        });
        const userId = {
            userId: data.id,
            userName: data.display_name,
        };
        dispach({ type:reducerCases.SET_USER_ID, userId });
        }
        getUserId();
    }, [dispach,token]);

    const [{ userId }] = useStateProvider();

  return(
    <Container>
        { /*<p>ID: {userId?.userId}</p> */}

        <UserInfo user_id = {userId?.userId} />
        <hr/>

        <RecentlyPlayed />

        <div className="big_cards">
            <FavoriteTrack />
            <ActualVibe />
        </div>

        <ActualGenres />

        <TopTracks/>
        <TopArtists />

        <div className="big_cards">
            <FavoriteArtist />
            <FavoriteAlbum />
        </div>

        <ActiveTrack />

        {
            /*
            <iframe
                title="Spotify Embed: Recommendation Playlist "
                src={`https://open.spotify.com/embed/playlist/06Vpoha8S7rDRk8VtRKDl2?utm_source=generator&theme=0`}
                width="70%"
                height="500px"
                style={{ minHeight: '360px' }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
            */
        }
        
    </Container>
);
}

const Container = styled.div`
    hr {
        margin: 10px 20px;
    }

    .body::-webkit-scrollbar {
        display: none;
    }

    .big_cards {
        display: flex;
        justify-content: space-between;
    }
`;

export default Perfil;