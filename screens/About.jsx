import { View } from "react-native";
import FooterMenu from "../components/forms/Menus/FooterMenu";

const About = () => {
  return (
    <View className="flex-1 flex-col justify-between m-3">
      <View className="flex-1 justify-end">
        <FooterMenu />
      </View>
    </View>
  );
};

export default About;
