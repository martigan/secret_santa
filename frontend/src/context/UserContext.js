import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretSantaResult, setSecretSantaResult] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = (data) => {
    const { access, refresh, user } = data;
    setUser(user);
    setToken(access);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);
  };

  const handleSignOut = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const handleSignUp = (data) => {
    const { access, refresh, user } = data;
    setUser(user);
    setToken(access);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        handleSignIn,
        handleSignOut,
        handleSignUp,
        secretSantaResult,
        setSecretSantaResult,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
