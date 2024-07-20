import { View,Text,TouchableOpacity } from "react-native"


const SubmitButton = ({handleSubmit,btnTitle,loading})=>{
    return(
        <TouchableOpacity onPress={handleSubmit} className="p-2 bg-black-100 rounded-full my-4 mx-6" activeOpacity={0.8}>
            <Text className="text-center text-[17px] text-white">
            {loading ? "Please Wait...":btnTitle}
                </Text>
        </TouchableOpacity>
    )
}

export default SubmitButton;