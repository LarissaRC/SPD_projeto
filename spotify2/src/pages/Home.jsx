import React from 'react';
import Sidebar from "../components/chat/Sidebar";
import Chat from "../components/chat/Chat";

export const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
