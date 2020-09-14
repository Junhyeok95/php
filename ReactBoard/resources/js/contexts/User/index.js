import React, { createContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const UserContext = createContext();

const UserContextProvider = withRouter(({ children, history }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    Axios({
      method: "post",
      url: "/login",
      data: {
        email,
        password
      }
    })
      .then(res => {
        setUserInfo(JSON.parse(res.config.data).email);
        history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const register = (name, email, password, passwordConfirm) => {
    Axios({
      method: "post",
      url: "/register",
      data: {
        name,
        email,
        password,
        password_confirmation: passwordConfirm
      }
    })
      .then(res => {
        history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const logout = () => {
    Axios({
      method: "post",
      url: "/logout"
    })
      .then(res => {
        setUserInfo(null);
        history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // localStorage -> 자동 로그인
    // sessionStorage -> 일회성
    // console.log(userInfo);
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
