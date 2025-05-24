import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from '../utills/DecodeToken';
import * as userService from '../services/userService';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true); 
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedUser = decodeToken(token);
          if (decodedUser && decodedUser._id) { 
            const fetchedUser = await userService.findOneByID(decodedUser._id);
            setUser(fetchedUser);
          } else {
            setUser(null);
            console.warn("Invalid token or missing _id in token.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); 
        }
      } else {
        setUser(null); 
      }
      setIsLoading(false); 
    };

    fetchUser(); 
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}> {/* <--- Pass isLoading in the context value */}
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };