import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    phone: "",
    email: "",
    isLogin: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLogin) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      isLogin: true,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser({
      phone: "",
      email: "",
      isLogin: false,
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
