import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from '../../context/UserContext';

function Chats({ currentUser }) {
  const [chats, setChats] = useState([]);
  const { setUserInfo } = useUser();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
        setChats(doc.data());
        console.log(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    setUserInfo(u);
  };

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.userProfileImage} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.userName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats;