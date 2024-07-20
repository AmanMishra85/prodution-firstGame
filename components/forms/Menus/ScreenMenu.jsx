import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../../screens/Home";
import Login from "../../../screens/auth/Login";
import Register from "../../../screens/auth/Register";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../../screens/Post";
import MyPost from "../../../screens/MyPost";
import Account from "../../../screens/Account";

const ScreenMenu = () => {
  // global state
  const [state] = useContext(AuthContext);

  //auth condition
  const authenticateduser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticateduser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: `Hi ${state?.user.name}`,
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="MyPost"
            component={MyPost}
            options={{
              title: "My Posts",
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
