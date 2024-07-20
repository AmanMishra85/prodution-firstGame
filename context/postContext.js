import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [authToken, setAuthToken] = useState(null);

  const getAllPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setPosts(data?.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in getAllPost:", error);
      throw error;
    }
  };

  // useEffect(() => {
  //   const loadAuthToken = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem('@auth');
  //       if (data !== null) {
  //         const loginData = JSON.parse(data);
  //         setAuthToken(loginData?.token);
  //         axios.defaults.headers.common['Authorization'] = `Bearer ${loginData?.token}`;
  //       }
  //     } catch (error) {
  //       console.error('Failed to load auth data from AsyncStorage', error);
  //     }
  //   };

  //   loadAuthToken();
  // }, []);

  useEffect(() => {
    // if (authToken) {
      getAllPost();
    // }
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPost]}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
