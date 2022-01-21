import React, { useState, createContext } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user: user, setUser: setUser, signIn: signIn, signOut: signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
