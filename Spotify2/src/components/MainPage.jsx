import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from '../utils/Constants';
import UserInfo from './perfilInfo/UserInfo';

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
        <p>ID: {userId?.userId}</p>
        <UserInfo user_id = {userId?.userId} />
    </Container>
);
}

const Container = styled.div`

`;

export default MainPage;