import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FooterMenu from "../components/forms/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useContext, useState } from "react";
import axios from "axios";
import { PostContext } from "../context/postContext";

const Post = ({ navigation }) => {
  // global state
  const [posts, setPosts] = useContext(PostContext);

  // local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title && description) {
        alert("Please add post title");
      }
      if (!description && title) {
        alert("Please add post description");
      }
      if (!description && !title) {
        alert("Please add post title & description");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      console.log(data?.Post);
      setPosts((prevPosts) => [data?.Post, ...prevPosts]);
      // alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message || error.message);
      console.log(error);
    }
  };

  return (
    <View className="flex-1 flex-col justify-between m-3 mt-10">
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text className="text-xl font-semibold uppercase">Create a post</Text>
          <TextInput
            placeholder="Add post title"
            placeholderTextColor={"gray"}
            className="bg-white border-2 border-gray-300 rounded-lg p-1 pl-3 w-80 mt-8"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            placeholder="Add post description"
            className="bg-white border-2 border-gray-300 rounded-xl p-1 pt-2 pl-3 w-80 mt-8"
            placeholderTextColor={"gray"}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }} className="mt-2">
          <TouchableOpacity
            onPress={handlePost}
            className="bg-black w-72 flex flex-row justify-center items-center"
            activeOpacity={0.8}
          >
            <FontAwesome5 name="plus-square" color={"white"} size={20} />
            <Text className="text-white text-center p-2">Create Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="flex-1 justify-end">
        <FooterMenu />
      </View>
    </View>
  );
};

export default Post;
