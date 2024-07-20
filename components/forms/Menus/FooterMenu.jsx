import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  //hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View className="flex-2 flex-row m-6 justify-between">
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        activeOpacity={0.8}
      >
        <FontAwesome5
          name="home"
          style={{ alignSelf: "center", marginBottom: 3, fontSize: 25 }}
          color={route.name === "Home" && "orange"}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Post")}
        activeOpacity={0.8}
      >
        <FontAwesome5
          name="plus-square"
          style={{ alignSelf: "center", marginBottom: 3, fontSize: 25 }}
          color={route.name === "Post" && "orange"}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyPost")}
        activeOpacity={0.8}
      >
        <FontAwesome5
          name="list"
          style={{ alignSelf: "center", marginBottom: 3, fontSize: 25 }}
          color={route.name === "MyPost" && "orange"}
        />
        <Text>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        activeOpacity={0.8}
      >
        <FontAwesome5
          name="user"
          style={{ alignSelf: "center", marginBottom: 3, fontSize: 25 }}
          color={route.name === "Account" && "orange"}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;
