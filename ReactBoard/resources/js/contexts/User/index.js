import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const login = () => {};
  const logout = () => {};

  useEffect(() => {
    // localStorage -> 자동 로그인
    // sessionStorage -> 일회성
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
