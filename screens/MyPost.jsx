import { View,Text, ScrollView } from "react-native"
import FooterMenu from "../components/forms/Menus/FooterMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const MyPost = ()=>{

    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);

    // get user posts

    const getUserPosts = async()=>{
        try{
            setLoading(true);
            const {data} = await axios.get("/post/get-user-post");
            setLoading(false);
            setPosts(data?.UserPosts);
        }
        catch(error){
            setLoading(false);
            console.log(error)
            alert(error.response.data.message)
        }
    }

    useEffect(()=>{
        getUserPosts();
    },[])

    return(
        <View className="flex-1 justify-between m-3">
            <ScrollView>
            <PostCard posts={posts} myPostScreen={true}/>
            {/* <Text>{JSON.stringify(posts,null,4)}</Text> */}
            </ScrollView>
            <View className="">
                <FooterMenu/>
            </View>
        </View>
    )
}

export default MyPost;