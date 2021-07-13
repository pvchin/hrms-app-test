import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/expenses_reducer";
import { expenses_url } from "../utils/constants";

import {} from "../actions";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  return [];
};
