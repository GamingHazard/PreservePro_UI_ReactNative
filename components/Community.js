import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
// import Mycard from "./.expo/app/Screens/Mycard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Mycard from "./Card2";
import { cards } from "./Data";

const Community = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {cards.map((card, index) => (
          <Mycard
            key={index}
            content={card.content}
            imgurl={card.imgurl}
            txtStyle={styles.txt}
            cardStyle={styles.card}
            imgStyle={styles.image}
            profilePic={card.profilePic}
            ID={card.ID}
            date={card.date}
            heartIcon={card.heartIcon}
            chatIcon={card.chatIcon}
            shareIcon={card.shareIcon}
            like={isHeartFilled ? "heart" : "heart-outline"}
            likecolor={isHeartFilled ? "#65000B" : "black"}
            likeAction={toggleHeart}
            comment={"chat-outline"}
            share={"share"}
            title={card.title}
            commentBtn={() => navigation.navigate("CommentSection")}
          />
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePost")}
        style={styles.addBtn}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "lightgrey",
    height: "100%",
    top: 20,
  },
  txt: {
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: -50,
  },
  card: {
    width: "93%",
    marginVertical: 10,
    elevation: 8,
  },
  image: {
    marginTop: -5,
    height: 270,
    width: "100%",
  },
  container: {
    marginTop: 25,
    flex: 1,
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    borderRadius: 55 / 2,
    elevation: 10,
  },
  bottomSpacing: {
    height: 70,
    width: "100%",
  },
});

export default Community;
