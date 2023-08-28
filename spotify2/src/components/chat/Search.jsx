import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import axios from 'axios';
import { useStateProvider } from "../../utils/StateProvider";
import FirebaseService from '../../firebase'

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [err, setErr] = useState(false);

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
          setCurrentUser(userData);
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

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            userName: user.userName,
            userProfileImage: user.userProfileImage,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            userName: currentUser.userName,
            userProfileImage: currentUser.userProfileImage,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.userProfileImage} alt="" />
          <div className="userChatInfo">
            <span>{user?.userName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;