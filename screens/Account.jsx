import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FooterMenu from "../components/forms/Menus/FooterMenu";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Account = () => {
  // global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  // local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View className="flex-1 flex-col justify-between m-3">
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.587644865.1720004349&semt=ais_user",
            }}
            style={{ width: 180, height: 180, borderRadius: 100 }}
          />
        </View>
        <Text className="text-red-500 text-sm text-center my-2 mx-1">
          Currently You can only Update Your Name And Password*
        </Text>

        <View className="mt-4 flex flex-row justify-center items-center">
          <Text className="font-semibold w-20">Name</Text>
          <TextInput
            value={name}
            className="w-60 bg-white py-1 px-4 rounded-lg"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View className="mt-4 flex flex-row justify-center items-center">
          <Text className="font-semibold w-20">Email</Text>
          <TextInput
            value={email}
            editable={false}
            className="w-60 bg-white py-1 px-4 rounded-lg"
          />
        </View>
        <View className="mt-4 flex flex-row justify-center items-center">
          <Text className="font-semibold w-20">Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="w-60 bg-white py-1 px-4 rounded-lg"
            secureTextEntry={true}
            placeholder="Change Password"
            placeholderTextColor={"gray"}
          />
        </View>
        <View className="mt-4 flex flex-row justify-center items-center">
          <Text className="font-semibold w-20">Role</Text>
          <TextInput
            value={state.user.role}
            editable={false}
            className="w-60 bg-white py-1 px-4 rounded-lg"
          />
        </View>
        <View className="flex justify-center items-center mt-6 mb-4">
          <TouchableOpacity activeOpacity={0.8} onPress={handleUpdate}>
            <Text className="bg-black-200 text-white p-2 rounded-lg w-44 text-center text-[15px]">
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="flex-1 justify-end">
        <FooterMenu />
      </View>
    </View>
  );
};

export default Account;
