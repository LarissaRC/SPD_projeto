import React, {useEffect, useContext} from 'react';
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from './utils/Constants';
import MainPage from './components/MainPage';

import "./style.scss"
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  /*
  const [{ token }, dispatch ] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type:reducerCases.SET_TOKEN, token })
    }
  },[token, dispatch])
  */

  // Chat only
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return(
    <div>
      { /*token ? <MainPage /> : <Login />*/ }

      {
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;