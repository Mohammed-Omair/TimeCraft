// src/context/AuthContext.js
import React, { createContext, useReducer } from 'react';
import { authReducer, initialState } from '../store/reducer/AuthReducer';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
