import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      async function fetchUser() {
        setLoading(true);
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/getUser`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (response) {
          if (response.status == 401) {
            setToken(null);
            navigate("/login");
          }
          setUser(response.data);
        }
      }
      fetchUser();
    }
    setLoading(false);
  }, []);

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        {
          email: data.email,
          password: data.password,
        }
      );

      setToken(response.data.accessToken);

      let response2 = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/getUser`,
        {
          headers: {
            "x-access-token": response.data.accessToken,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response2) {
        if (response2.status == 401) {
          setToken(null);
          navigate("/login");
        }
        setUser(response2.data);
      }

      axios.defaults.headers.common["x-access-token"] =
        response.data.accessToken;

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status != 200) {
        setError(error.response.data.message);
        return;
      }
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      error,
      token,
    }),
    [user, loading, error, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
