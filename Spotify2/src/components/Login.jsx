import React from 'react';
import styled from "styled-components";

function Login() {

    const handleClick = () => {
        const clientId = "853c6f6b5373432eb4016f28c0f9a676";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read'
        ];

        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
    };

    return(
    <Container>
        <img
            src="https://media.discordapp.net/attachments/1140720087108694150/1141799784760484040/spdfy.png?width=275&height=173"
            alt="spdfy" />
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #292929;
    gap: 5rem;
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: white;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer;
    }
`;

export default Login;