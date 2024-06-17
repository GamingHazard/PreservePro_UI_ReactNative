import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const Mycard = ({
  title,
  imgurl,
  cardStyle,
  imgStyle,
  content,
  txtStyle,
  profStyle,
  profilePic,
  ID,
  date,
  commentBtn,
  like,
  likecolor,
  likeAction,
  comment,
  share,
}) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <Card containerStyle={[styles.card, cardStyle]}>
      <View style={[styles.avatar, profStyle]}>
        <Avatar rounded size="medium" source={profilePic} />
        <Text style={styles.userInfo}>
          {ID}
          {"\n"}
          {date}
        </Text>
      </View>
      {imgurl && <Image style={[styles.img, imgStyle]} source={imgurl} />}
      <Card.Divider />
      {title && <Card.Title style={styles.title}>{title}</Card.Title>}
      {content && <Text style={[styles.txt, txtStyle]}>{content}</Text>}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleHeart}>
          {/* <MaterialCommunityIcons
            name={isHeartFilled ? "heart" : "heart-outline"}
            size={30}
            color={isHeartFilled ? "#65000B" : "black"}
          /> */}
          <MaterialCommunityIcons name={like} size={30} color={likecolor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={commentBtn}>
          <MaterialCommunityIcons name={comment} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name={share} size={30} color="black" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default Mycard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 0,
    width: "93%",
    marginVertical: 10,
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userInfo: {
    marginHorizontal: 20,
    alignSelf: "center",
    fontSize: 16,
  },
  img: {
    width: "100%",
    height: 120,
  },
  title: {
    fontSize: 12,
  },
  txt: {
    padding: 10,
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
});
