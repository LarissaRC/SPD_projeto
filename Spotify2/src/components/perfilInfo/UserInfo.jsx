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
      <p>User: {userInfo?.userName}</p>
      <p>Followers: {userInfo?.userFollowers}</p>
      <img
        src={userInfo?.userProfileImage}
        alt="spotify" />
  </Container>
);
}

const Container = styled.div`

`;

export default UserInfo;