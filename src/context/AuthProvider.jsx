import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  let initialPersist;
  try {
    // Tente de parser la valeur de "persist" depuis le localStorage
    initialPersist = JSON.parse(localStorage.getItem("persist"));
  } catch (error) {
    // Si une erreur survient, définit "persist" à false par défaut
    initialPersist = false;
  }

  const [persist, setPersist] = useState(initialPersist);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {console.log(auth)}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
