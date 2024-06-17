import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotifications } from "./NotificationContext ";
const BadgeCounter = () => {
  const { unreadCount } = useNotifications();

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{unreadCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: "#65000B",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default BadgeCounter;
