import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Market = () => {
  const navigation = useNavigation();

  const markets = [
    { name: "Ssekide", count: "0774205474" },
    { name: "Wasswa", count: "0774205474" },
    { name: "Joshua", count: "0774205474" },
    { name: "Broski", count: "0774205474" },
    { name: "Moses", count: "0774205474" },
    { name: "Steven", count: "0774205474" },
  ];

  return (
    <View style={styles.container}>
      {markets.map((market, index) => (
        <TouchableOpacity
          key={index}
          // onPress={() => navigation.navigate("SelectedMarket")}
          style={styles.tab}
        >
          <View style={{ width: "70%" }}>
            <Text>{market.name}</Text>
          </View>
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text>{market.count}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    paddingTop: 40,
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    borderRadius: 30,
    elevation: 10,
  },
  tab: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "white",
    height: "auto",
    marginVertical: 10,
    flexDirection: "row",
  },
});
