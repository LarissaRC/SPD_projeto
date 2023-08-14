import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { reducerCases } from '../../utils/Constants';

function UserInfo({ user_id }) {
  const [{ token, userInfo }, dispach] = useStateProvider();
  useEffect(() => {
      const getUserInfo = async() => {
      const { data } = await axios.get(`https://api.spotify.com/v1/users/${user_id}`,
      {
          headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          },
      });

      //console.log(data);

      const userInfo = {
          userName: data.display_name,
          userFollowers: data.followers.total,
          userProfileImage: data.images[1].url,
      };
      dispach({ type:reducerCases.SET_USER, userInfo });
      }
      getUserInfo();
  }, [token, dispach, user_id]);

return(
  <Container>
    <img
      src={userInfo?.userProfileImage}
      alt="spotify"
      className="user_image" />
    <div className="user_info">
      <p className="user_name">{userInfo?.userName}</p>
      { /*<p>Followers: {userInfo?.userFollowers}</p>*/ }

      <p className="user_bio">Descrição breve que o usuário deseja dar àqueles que forem dar uma olhada no seu perfil. Tipo: amante de música, kpoper raiz, adepto ao samba, etc etc.</p>

      <div className="user_tags">
        <div className="user_tag"><span>Rock</span></div>
        <div className="user_tag"><span>Pop</span></div>
        <div className="user_tag"><span>Jazz</span></div>
        <div className="user_tag"><span>Country</span></div>
      </div>
    </div>
  </Container>
);
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 160px;
    height: 160px;
    border-radius: 35px;
  }

  .user_info {
    
  }

  .user_name {
    font-size: 32px;
    margin: 0 20px;
  }

  .user_bio {
    font-size: 16px;
    margin: 0 20px;
  }

  .user_tags {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .user_tag {
    text-align: center;
    justify-content: center;
    background-color: #79db8b;
    border: 2px #000 solid;
    border-radius: 8px;
    width: 100px;
    height: 30px;
  }
`;

export default UserInfo;