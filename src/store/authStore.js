import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    console.log('Estado autenticado:', storedAuthState);
  console.log('Datos del usuario:', storedUser);
  }, []);

  const logIn = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ _id: userData._id })); // Solo guardamos el _id

    console.log('Usuarioddd guardado en localStorage:', { _id: userData._id });
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
