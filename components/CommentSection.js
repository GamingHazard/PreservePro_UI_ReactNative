import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CommentCards from "./CommentCards";
import Inputs from "./Inputs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommentSection = ({ toggleDrawer, showComment, postId }) => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load comments from AsyncStorage when the component mounts
    const loadComments = async () => {
      try {
        const storedComments = await AsyncStorage.getItem("comments");
        if (storedComments !== null) {
          setComments(JSON.parse(storedComments));
        }
      } catch (error) {
        console.error("Error loading comments from AsyncStorage:", error);
      }
    };

    loadComments();
  }, []);

  const saveComments = async (updatedComments) => {
    try {
      await AsyncStorage.setItem("comments", JSON.stringify(updatedComments));
    } catch (error) {
      console.error("Error saving comments to AsyncStorage:", error);
    }
  };

  const handleCommentSubmit = () => {
    if (text.trim() === "") {
      Alert.alert("Error", "Please enter a comment");
      return;
    }

    const newComment = {
      userEmail: "user@example.com", // Example user email
      content: text,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    saveComments(updatedComments);

    setText("");

    // Navigate to another screen after comment submission
    navigation.navigate("Community");

    // Optionally, close the modal or perform any other actions
    // toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showComment}
        onRequestClose={toggleDrawer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.commentContainer}>
            <ScrollView style={styles.scrollView}>
              {comments.map((comment, index) => (
                <CommentCards
                  key={index}
                  userEmail={comment.userEmail}
                  content={comment.content}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Inputs
              inputStyle={styles.input}
              multiline={true}
              numberOfLines={4}
              value={text}
              onChangeText={setText}
              placeholder="Add Comment..."
            />
            <View style={styles.sendButtonContainer}>
              <TouchableOpacity onPress={handleCommentSubmit}>
                <MaterialCommunityIcons
                  style={styles.sendIcon}
                  name="send"
                  size={30}
                  color="#65000B"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    backgroundColor: "whitesmoke",
    marginTop: 20,
    borderRadius: 8,
    elevation: 8,
  },
  commentContainer: {
    backgroundColor: "whitesmoke",
    height: 720,
    width: "100%",
    padding: 10,
  },
  scrollView: { marginTop: -7 },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "white",
  },
  input: { width: "80%" },
  sendButtonContainer: {
    width: "15%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: { marginBottom: 2 },
});

export default CommentSection;
