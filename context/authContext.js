import React, { Children, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// context
export const AuthContext = createContext();

// provider
const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loadLoaclStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);

      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLoaclStorageData();
  }, []);

  // default axios settings
  axios.defaults.baseURL =
    "https://production-rnfs-backend-mbgv.vercel.app/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
