import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

function Chats() {
  const [chats, setChats] = useState([]);

  //const { currentUser } = useContext(AuthContext);
  //const { dispatch } = useContext(ChatContext);

  /*
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  */

  return (
    <div className='chats'>
      {/*Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))*/}
      {
        <div
          className="userChat"
        >
          <img src="data:image/jpeg;base64,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" alt="" />
          <div className="userChatInfo">
            <span>Nome</span>
            <p>Ultima conversa</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Chats;