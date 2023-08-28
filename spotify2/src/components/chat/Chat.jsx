import React, { useContext } from 'react';
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from "../../context/ChatContext";
import { useUser } from '../../context/UserContext';

function Chat({ currentUser }) {
  //const { data } = useContext(ChatContext);
  const { userInfo } = useUser();

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{userInfo?.userName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat;