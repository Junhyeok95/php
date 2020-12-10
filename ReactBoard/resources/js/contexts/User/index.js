import React, { createContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const UserContext = createContext();

const UserContextProvider = withRouter(({ children, history }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    Axios({
      method: "post",
      url: "/api/auth/login",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        setCurrentUser(res);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const register = (name, email, password, passwordConfirm) => {
    Axios({
      method: "post",
      url: "/api/auth/register",
      data: {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      },
    })
      .then((res) => {
        setCurrentUser(res);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    if (userInfo.token) {
      Axios({
        method: "post",
        url: "/api/auth/logout",
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
        .then((res) => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUserInfo(null);
          history.push("/");
        })
        .catch(function (error) {
          // console.log(error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUserInfo(null);
          history.push("/");
        });
    }
  };

  const loadUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentUser = (res) => {
    if (res.data.access_token) {
      let userData = {
        email: res.data.current_user.email,
        name: res.data.current_user.name,
        token: res.data.access_token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(res.data.access_token));
      setUserInfo(userData);
      history.push("/");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
});

export { UserContextProvider, UserContext };
