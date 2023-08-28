import { createContext, useEffect, useState } from "react";
import FirebaseService from '../firebase'
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
