import { View, Text, Alert } from "react-native";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [SinglePost, setSinglePost] = useState({});

  // delete-confirmation prompt
  const handleDeletPrompt = (id) => {
    Alert.alert("Attention", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Press");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  // delete Post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPost");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <View>
      <Text className="text-green-800 text-center">
        All Posts - ({posts?.length})
      </Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          SinglePost={SinglePost && SinglePost}
        />
      )}
      {posts?.map((post, i) => (
        <View
          className="border-2 border-gray-200 p-2 pl-4 my-2 rounded-lg bg-white"
          key={i}
        >
          {myPostScreen && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 20,
              }}
            >
              <Text className="text-right">
                <FontAwesome5
                  name="pen"
                  color={"black"}
                  size={17}
                  onPress={() => {
                    setSinglePost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text className="text-right">
                <FontAwesome5
                  name="trash"
                  color={"red"}
                  size={17}
                  onPress={() => handleDeletPrompt(post?._id)}
                />
              </Text>
            </View>
          )}
          <View>
            <Text className="font-semibold mb-2 border-b-[2px] pb-1 border-gray-300">
              {post?.title}
            </Text>
            <Text>{post?.description}</Text>
          </View>
          <View className="flex flex-row justify-between mt-5">
            {post?.postedBy?.name && (
              <Text>
                <FontAwesome5 name="user" color={"orange"} />
                {" " + post?.postedBy?.name}
              </Text>
            )}

            <Text>
              <FontAwesome5 name="clock" color={"orange"} />
              {" " + moment(post?.createdAt).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PostCard;
