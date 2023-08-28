import { createContext, useContext, useState } from "react";
import FirebaseService from '../firebase'
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
