import { message } from "antd";
import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../helpers/cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);
  const history = useHistory();

  const login = async (credentials) => {
    const { email, password, remember } = credentials;
    setAuthenticating(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
      });

      //    token = res.data.token;
      remember
        ? setCookie("auth-token", res.data.token, 7)
        : sessionStorage.setItem("auth-token", res.data.token);

      setAuthed(true);
      history.replace(`/`);

      message.success(`Successfully logged in`);
    } catch (error) {
      setAuthed(false);
      message.error(`Authentication faild`);
    }
    setAuthenticating(false);
  };

  const logout = async () => {
    const token =
      getCookie("auth-token") || sessionStorage.getItem("auth-token");
    setAuthenticating(true);
    try {
      await axios.get("/api/v1/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthed(false);
      deleteCookie("auth-token");
      sessionStorage.removeItem("auth-token");

      history.replace(`/login`);
      message.success(`Successfully logged out`);
    } catch (error) {
      message.error(`Something went wrong, Refresh and try again`);
    }
    setAuthenticating(false);
  };

  const authenticateUser = async () => {
    const token =
      getCookie("auth-token") || sessionStorage.getItem("auth-token");
    if (!token) {
      history.replace(`/login`);
    } else {
      try {
        await axios.get(`/api/v1/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthed(true);
      } catch (err) {
        setAuthed(false);
      }
    }
    setAuthenticating(false);
  };

  useEffect(() => {
    //  check is user authenticated or not
    authenticateUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ authed, login, logout, authenticating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
