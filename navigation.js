import { View } from "react-native";
import AuthContextProvider from "./context/authContext";
import ScreenMenu from "./components/forms/Menus/ScreenMenu";
import PostContextProvider from "./context/postContext";

const RouteNavigation = () => {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ScreenMenu />
      </PostContextProvider>
    </AuthContextProvider>
  );
};

export default RouteNavigation;
