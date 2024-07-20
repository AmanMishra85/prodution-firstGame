import { useContext } from "react";
import { View,Text, TouchableOpacity } from "react-native"
import { AuthContext } from "../../../context/authContext";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HeaderMenu = ()=>{

    // global state
    const [state,setState] = useContext(AuthContext); 


    // logout

    const handleLogout = async()=>{
        setState({token:'',user:null});
        await AsyncStorage.removeItem("@auth");
        alert("Logout Successfully");
    }

    return (
        <View>
            <TouchableOpacity onPress={handleLogout}>
            <FontAwesome5 name="sign-out-alt" color={"red"} style={{alignSelf:'center',fontSize:20}}/>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderMenu;