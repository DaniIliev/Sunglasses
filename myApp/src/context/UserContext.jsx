import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from '../utills/DecodeToken';
// import { default as jwtDecode } from 'jwt-decode';
import * as userService from '../services/userService'


const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      const decodedUser = decodeToken(token);
      console.log(decodedUser._id)
      userService.findOneByID(decodedUser._id)
                .then((user) => setUser(user) )

      // console.log("Decoded Payload:", decodedUser);
      // setUser(decodedUser); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
