import React, {useEffect} from 'react';
import Login from "./components/Login";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from './utils/Constants';
import Spotify2 from './components/Spotify2';
import MainPage from './components/MainPage';

function App() {
  const [{ token }, dispatch ] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type:reducerCases.SET_TOKEN, token })
    }
  },[token, dispatch])

  return(
    <div>
      { /*token ? <Spotify2 /> : <Login />*/ }
      { token ? <MainPage /> : <Login /> }
    </div>
  )
}

export default App;