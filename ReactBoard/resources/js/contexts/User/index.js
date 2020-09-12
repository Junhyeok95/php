import React, { createContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const UserContext = createContext();

const UserContextProvider = withRouter(({ children, history }) => {
  const URL = "/";

  const [userInfo, setUserInfo] = useState({});

  const login = () => {
    console.log(URL);
    console.log("login");
  };

  const register = () => {
    console.log(URL);
    console.log("register");
  };

  const logout = () => {
    console.log(URL);
    Axios.post("/logout", {
      header: {
        Accept: "application/json"
      }
    }).then(res => {
      // console.log(res);
      history.push("/");
    });
  };

  useEffect(() => {
    // localStorage -> 자동 로그인
    // sessionStorage -> 일회성
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        login,
        register,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
});

export { UserContextProvider, UserContext };
