import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Sidebar from '../chat/Sidebar';
import Chat from '../chat/Chat';
import FirebaseService from '../../firebase'
import axios from 'axios';
import { useStateProvider } from "../../utils/StateProvider";

function ChatScreen() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const [{ token }, dispach] = useStateProvider();
    useEffect(() => {
        
    }, [dispach,token]);

  useEffect(() => {
    const getUserId = async() => {
    const { data } = await axios.get('https://api.spotify.com/v1/me',
    {
        headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        },
    });
    setUserId(data.id);
    }
    getUserId();

    // Crie uma instância da classe FirebaseService
    const firebaseService = new FirebaseService();

    // Chame o método para recuperar o usuário por ID
    firebaseService.getUserById(userId)
      .then((userData) => {
        // Verifique se o usuário foi encontrado
        if (userData) {
          setUser(userData);
          //console.log(userData);
        } else {
          // Trate o caso em que o usuário não foi encontrado
          console.log('Usuário não encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar usuário:', error);
      });
  }, [userId]);

  return(
    <div className="home">
      <div className="container">
        <Sidebar currentUser={user}/>
        <Chat  currentUser={user}/>
      </div>
    </div>
);
}

const Container = styled.div`
`;

export default ChatScreen;