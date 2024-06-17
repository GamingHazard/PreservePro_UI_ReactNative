import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const CommentCards = ({ userEmail, content }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Avatar rounded size="small" source={require("../assets/avatar.jpg")} />
        <Text style={{ top: 7, fontWeight: "bold", marginLeft: 5 }}>
          {userEmail}
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default CommentCards;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    elevation: 8,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  content: { width: "100%", height: "auto", marginTop: 10 },
});
