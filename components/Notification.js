// Notifications.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
// import NotificationContext from "./NotificationContext";
import NotificationContext from "./NotificationContext ";

const Notifications = () => {
  const { notifications, clearNotifications } = useContext(NotificationContext);
  const navigation = useNavigation();

  const handleNotificationPress = (notification) => {
    if (notification.includes("sales")) {
      navigation.navigate("Sales");
    } else if (notification.includes("storage")) {
      navigation.navigate("StoreManagement");
    } else if (notification.includes("Market")) {
      navigation.navigate("Market");
    }
  };

  const handleClearNotifications = () => {
    clearNotifications();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {notifications.map((notification, index) => (
        <TouchableOpacity
          key={index}
          style={styles.notification}
          onPress={() => handleNotificationPress(notification)}
        >
          <Text style={styles.notificationTitle}>
            <Text style={styles.boldText}> </Text>
            <Text style={styles.notificationText}>{notification}</Text>
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearNotifications}
      >
        <MaterialIcons name="delete" size={34} color="#65000B" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  notification: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#EEE",
  },
  notificationTitle: {
    // fontWeight: "bold",
  },
  notificationText: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  clearButton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default Notifications;
