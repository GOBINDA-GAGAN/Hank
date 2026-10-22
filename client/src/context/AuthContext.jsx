import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const register = async (userData) => {
    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  };


  const login = async (credentials) => {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    setUser(response.data.user);

    return response.data;
  };


  const getUser = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      setUser(null);

      throw error;
    }
  };


  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };



  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUser();
      } catch (error) {
        // User is not authenticated.
        // This is expected when no valid cookie exists.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        getUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};