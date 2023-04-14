import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const userId = localStorage.getItem("asdasd");
  const users = localStorage.getItem("asdasdasd");
  return (
    <AuthContext.Provider value={{ auth, userId, users, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
