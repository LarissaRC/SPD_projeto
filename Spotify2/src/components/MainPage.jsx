import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from '../utils/Constants';
import Perfil from './Home/Perfil';
import ChatScreen from './Home/ChatScreen';
import { BsFillChatRightFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidMusic } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import Discover from './Home/Discover';

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

    const [lastClicked, setLastClicked] = useState(1);
    const [actuaComponent, setActuaComponent] = useState(1);

    const handleButtonClick = (buttonNumber) => {
        setLastClicked(buttonNumber);
        setActuaComponent(buttonNumber);
    };

  return(
    <Container>
        <div className="sidebar">
            <div className="menu">
                <button className={`menu_button ${lastClicked === 1 ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(1)}>
                    <FaUserAlt color={lastClicked === 1 ? 'white' : ''} />
                    <span className="button_text">Perfil</span>
                </button>
                <button className={`menu_button ${lastClicked === 2 ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(2)}>
                    <BsFillChatRightFill color={lastClicked === 2 ? 'white' : ''} />
                    <span className="button_text">Conversas</span>
                </button>
                <button className={`menu_button ${lastClicked === 3 ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(3)}>
                    <BiSolidMusic color={lastClicked === 3 ? 'white' : ''} />
                    <span className="button_text">Recomendações</span>
                </button>
                <button className={`menu_button ${lastClicked === 4 ? 'active' : ''}`}
                                    onClick={() => handleButtonClick(4)}>
                    <BiWorld color={lastClicked === 4 ? 'white' : ''} />
                    <span className="button_text">Sobre nós</span>
                </button>
            </div>
        </div>
        <div className="body">
            { actuaComponent === 1 && <Perfil /> }
            { actuaComponent === 2 && <ChatScreen /> }
            { actuaComponent === 3 && <Discover /> }
        </div>
        <div className="right_side_bar">

        </div>
    </Container>
);
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: space-around;
    align-items: center;
    background-color: #32a852;

    hr {
        margin: 10px 20px;
    }

    .sidebar {
        display: flex;
        align-itens: center;
    }

    .menu_button {
        display: flex;
        align-items: center;
        align-self: center;
        width: 200px;
        height: 40px;
        margin: 10px 0;

        border-radius: 8px;
        cursor: pointer;
        border-style: none;
    }

    .active {
        background-color: #292929;
    }

    .active span {
        color: #fff;
    }

    .button_text {
        font-size: 20px;
        margin-left: 10px;
    }

    .body {
        width: 60vw;
        height: 90vh;
        background-color: #fff;
        overflow: auto;

        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;

        border-radius: 10px;
    }

    .body::-webkit-scrollbar {
        display: none;
    }

    .big_cards {
        display: flex;
        justify-content: space-between;
    }
`;

export default MainPage;