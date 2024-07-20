import { View, Text,TextInput} from "react-native";
import React from "react";

const InputBox = ({title,keyboardType,autoComplete,secureTextEntry=false,placeholder,value,setValue}) => {
  return (
      <View>
      <Text>{title}</Text>
      <TextInput className="h-10 mb-2 bg-[#ffff] rounded-md p-2 mt-2" autoCorrect={false}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text)=>setValue(text)}
      />
    </View>
  );
};

export default InputBox;
