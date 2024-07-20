import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useContext } from "react";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("Login Data : ", { email, password });
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
      console.log(error);
    }
  };

  // temparary functions to check local-storage data

  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage : ", data);
  };
  getLocalStorageData();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-[#e1d5c9] flex-1 justify-center">
        <Text className="text-3xl font-semibold text-center text-gray-800">
          Login
        </Text>
        <View className="mx-10 my-2">
          <InputBox
            title="Email"
            keyboardType="email-address"
            autoComplete="email"
            placeholder={"example@gamil.com"}
            value={email}
            setValue={setEmail}
          />
          <InputBox
            title="Password"
            secureTextEntry={true}
            autoComplete={"password"}
            placeholder={"*********"}
            value={password}
            setValue={setPassword}
          />
          <SubmitButton
            btnTitle={"Login"}
            loading={loading}
            handleSubmit={handleSubmit}
          />
          <Text className="text-[15px] text-center">
            Don't have an account ?&nbsp;{" "}
            <Text
              className="text-red-600"
              onPress={() => navigation.navigate("Register")}
            >
              REGISTER
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
