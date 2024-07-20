import {
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // functios
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login")
      console.log("Register Data => ", { name, email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log("Error:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-[#e1d5c9] flex-1 justify-center">
        <Text className="text-3xl font-semibold text-center text-gray-800">
          Register
        </Text>
        <View className="mx-10 my-2">
          <InputBox
            title="Name"
            placeholder={"John De"}
            value={name}
            autoComplete={"name"}
            setValue={setName}
          />
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
          {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
          <SubmitButton
            btnTitle={"Register"}
            loading={loading}
            handleSubmit={handleSubmit}
          />
          <Text className="text-[15px] text-center">
            Already have account ? &nbsp;
            <Text
              className="text-red-600"
              onPress={() => navigation.navigate("Login")}
            >
              LOGIN
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
