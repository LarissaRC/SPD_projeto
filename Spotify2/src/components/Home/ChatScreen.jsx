import React from 'react';
import styled from "styled-components";
import Sidebar from '../chat/Sidebar';
import Chat from '../chat/Chat';

function ChatScreen() {

  return(
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
);
}

const Container = styled.div`
`;

export default ChatScreen;