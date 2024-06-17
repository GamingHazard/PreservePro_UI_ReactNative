// Storage.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
// import NotificationContext from "../NotificationContext";
import NotificationContext from "./NotificationContext ";
import Toast from "react-native-toast-message";

const Storage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    weight: "",
    dateOfProduction: "",
    description: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    loadSubmittedData();
  }, []);

  const loadSubmittedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("submittedData");
      if (storedData !== null) {
        setSubmittedData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load submitted data", error);
    }
  };

  const saveSubmittedData = async (data) => {
    try {
      await AsyncStorage.setItem("submittedData", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save submitted data", error);
    }
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Validation
    for (const key in formData) {
      if (formData[key] === "") {
        Alert.alert("Error", "All fields must be filled in.");
        return;
      }
    }

    const newEntry = { ...formData, timestamp: new Date().toLocaleString() };
    const newSubmittedData = [newEntry, ...submittedData]; // Prepend new entry
    setSubmittedData(newSubmittedData);
    saveSubmittedData(newSubmittedData);
    addNotification(`New storage item added: ${formData.itemName}`);

    // Show toast notification
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: `New storage item added: ${formData.itemName}`,
    });

    setFormData({
      itemName: "",
      quantity: "",
      weight: "",
      dateOfProduction: "",
      description: "",
    });
    setFormVisible(false);
  };

  const handleDelete = (index) => {
    const deletedItem = submittedData[index].itemName; // Get the name of the deleted item
    const newSubmittedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newSubmittedData);
    saveSubmittedData(newSubmittedData);
    addNotification(`Item deleted from storage: ${deletedItem}`);

    // Show toast notification
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: `Item deleted from storage: ${deletedItem}`,
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title={formVisible ? "Close Form" : "Add Items"}
        onPress={toggleForm}
        color={"#65000B"}
      />
      {formVisible && (
        <View style={styles.form}>
          <Text>Item Name:</Text>
          <TextInput
            style={styles.input}
            value={formData.itemName}
            onChangeText={(text) => handleInputChange("itemName", text)}
          />
          <Text>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={formData.quantity}
            onChangeText={(text) => handleInputChange("quantity", text)}
          />
          <Text>Weight:</Text>
          <TextInput
            style={styles.input}
            value={formData.weight}
            onChangeText={(text) => handleInputChange("weight", text)}
          />
          <Text>Date of Production:</Text>
          <TextInput
            style={styles.input}
            value={formData.dateOfProduction}
            onChangeText={(text) => handleInputChange("dateOfProduction", text)}
          />
          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
      <ScrollView style={styles.submittedDataContainer}>
        {submittedData.map((data, index) => (
          <View key={index} style={styles.submittedData}>
            <View style={styles.dataText}>
              <Text style={styles.boldText}>
                Item Name:{" "}
                <Text style={styles.normalText}>{data.itemName}</Text>
              </Text>
              <Text style={styles.boldText}>
                Quantity: <Text style={styles.normalText}>{data.quantity}</Text>
              </Text>
              <Text style={styles.boldText}>
                Weight: <Text style={styles.normalText}>{data.weight}</Text>
              </Text>
              <Text style={styles.boldText}>
                Date of Production:{" "}
                <Text style={styles.normalText}>{data.dateOfProduction}</Text>
              </Text>
              <Text style={styles.boldText}>
                Description:{" "}
                <Text style={styles.normalText}>{data.description}</Text>
              </Text>
              <Text style={styles.boldText}>
                Submitted At:{" "}
                <Text style={styles.normalText}>{data.timestamp}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={styles.deleteButton}
            >
              <Icon name="delete" size={24} color="#65000B" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  form: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  submittedDataContainer: {
    marginTop: 20,
    width: "100%",
  },
  submittedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  dataText: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    top: -50,
  },
  boldText: {
    fontWeight: "bold",
  },
  normalText: {
    fontWeight: "normal",
  },
});

export default Storage;
