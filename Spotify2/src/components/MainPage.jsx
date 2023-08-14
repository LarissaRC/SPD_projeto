import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from '../utils/Constants';
import UserInfo from './perfilInfo/UserInfo';
import TopTracks from './perfilInfo/TopTracks';
import TopArtists from './perfilInfo/TopArtists';
import RecentlyPlayed from './perfilInfo/RecentlyPlayed';
import ActiveTrack from './perfilInfo/ActiveTrack';

function MainPage() {
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
        <div className="sidebar">
            <div className="menu">

            </div>
        </div>
        <div className="body">
            <p>ID: {userId?.userId}</p>
            <UserInfo user_id = {userId?.userId} />

            <TopTracks/>
            <TopArtists />
            <RecentlyPlayed />
            <ActiveTrack />
        </div>
        <div className="right_side_bar">

        </div>
    </Container>
);
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
    background-color: #32a852;

    .body {
        width: 60vw;
        height: 90vh;
        background-color: #fff;
        overflow: auto;

        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;
    }

    .body::-webkit-scrollbar {
        display: none;
    }
`;

export default MainPage;