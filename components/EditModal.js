import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native"; // Importing TextInput from react-native
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EditModal = ({ modalVisible, setModalVisible, SinglePost }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPost");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response?.data?.message || "Failed to update post.");
    }
  };

  useEffect(() => {
    setTitle(SinglePost?.title);
    setDescription(SinglePost?.description);
  }, [SinglePost]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Your Posts</Text>
            <Text>Title</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => setTitle(text)}
              value={title}
              placeholder="Enter title" // Placeholder text
            />
            <Text>Description</Text>
            <TextInput
              style={[styles.inputBox, styles.textArea]}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Enter description" // Placeholder text
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updatePostHandler(SinglePost?._id);
                  setModalVisible(!modalVisible);
                }}
                disabled={loading}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please Wait" : "UPDATE"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                disabled={loading}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  textArea: {
    minHeight: 100, // Adjust height for multiline text inputs
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
    elevation: 2,
    margin: 10,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default EditModal;
