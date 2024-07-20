import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/forms/Menus/FooterMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";

const Home = () => {
  // global state
  const [posts, setPosts, getAllPost] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllPost();
      console.log("Home Page Refreshed...");
    } catch (error) {
      console.error("Error in onRefresh:", error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, []);

  return (
    <View className="flex-1 flex-col justify-between m-3">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
      </ScrollView>
      <View className="bg-white">
        <FooterMenu />
      </View>
    </View>
  );
};

export default Home;
