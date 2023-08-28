import React, { useContext, useEffect, useState } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import FirebaseService from '../../firebase'
import axios from 'axios';
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from '../../utils/Constants';

function Navbar() {
  //const {currentUser} = useContext(AuthContext)
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

  return (
    <div className='navbar'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={user?.userProfileImage} alt="" />
        <span>{user?.userName}</span>
        {/*<button onClick={()=>signOut(auth)}>logout</button>*/}
      </div>
    </div>
  )
}

export default Navbar;