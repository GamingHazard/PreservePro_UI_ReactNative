import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
// import NotificationContext from "./NotificationContext";
import NotificationContext from "./NotificationContext ";

const Sales = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfManufacture, setDateOfManufacture] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [records, setRecords] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem("records");
      if (savedRecords !== null) {
        const parsedRecords = JSON.parse(savedRecords);
        setRecords(parsedRecords);
        calculateTotalPrice(parsedRecords);
      }
    } catch (error) {
      console.error("Failed to load records from storage", error);
    }
  };

  const saveRecords = async (newRecords) => {
    try {
      await AsyncStorage.setItem("records", JSON.stringify(newRecords));
    } catch (error) {
      console.error("Failed to save records to storage", error);
    }
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    if (
      !productName.trim() ||
      !weight.trim() ||
      !dateOfManufacture.trim() ||
      !price.trim()
    ) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    } else {
      Alert.alert("Success", "Record created successfully");
    }

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    const newRecord = {
      productName,
      weight,
      dateOfManufacture,
      description,
      price: parseFloat(price),
      timestamp,
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
    calculateTotalPrice(updatedRecords);

    addNotification(`New sales record added: ${productName}`);

    // Show toast notification
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: `New sales record added: ${productName}`,
    });

    setProductName("");
    setWeight("");
    setDateOfManufacture("");
    setDescription("");
    setPrice("");
    setFormVisible(false);
  };

  const deleteRecord = async (index) => {
    const deletedRecord = records[index];
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
    calculateTotalPrice(updatedRecords);

    // Delete the corresponding notification
    try {
      const savedNotifications = await AsyncStorage.getItem("notifications");
      if (savedNotifications !== null) {
        const parsedNotifications = JSON.parse(savedNotifications);
        const updatedNotifications = parsedNotifications.filter(
          (notification) =>
            notification !==
            `New sales record added: ${deletedRecord.productName}`
        );
        await AsyncStorage.setItem(
          "notifications",
          JSON.stringify(updatedNotifications)
        );
      }
    } catch (error) {
      console.error("Failed to delete notification", error);
    }

    // Show toast notification
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: `Sales record deleted: ${deletedRecord.productName}`,
    });
  };

  const calculateTotalPrice = (records) => {
    const total = records.reduce((sum, record) => sum + record.price, 0);
    setTotalPrice(total);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleForm}>
        <Text style={styles.buttonText}>
          {isFormVisible ? "Hide Form" : "Add Sales"}
        </Text>
      </TouchableOpacity>
      {isFormVisible && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight in Kgs"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Production Date"
            value={dateOfManufacture}
            onChangeText={setDateOfManufacture}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Create Record" onPress={handleSubmit} />
        </View>
      )}
      <Text style={styles.totalPriceText}>
        Profits Made {""}: {totalPrice.toFixed(2)} Shs
      </Text>
      <View style={styles.records}>
        {records.map((record, index) => (
          <View key={index} style={styles.record}>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => deleteRecord(index)}
            >
              <MaterialCommunityIcons name="delete" size={24} color="#65000B" />
            </TouchableOpacity>
            <Text style={styles.recordText}>
              <Text style={styles.boldText}>Item Name:</Text>{" "}
              {record.productName}
            </Text>
            <Text style={styles.recordText}>
              <Text style={styles.boldText}>Weight:</Text> {record.weight}
            </Text>
            <Text style={styles.recordText}>
              <Text style={styles.boldText}>Description:</Text>{" "}
              {record.description}
            </Text>
            <Text style={styles.recordText}>
              <Text style={styles.boldText}>Price:</Text> {record.price}
            </Text>
            <Text style={styles.recordText}>
              <Text style={styles.boldText}>Sold on:</Text> {record.timestamp}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#65000B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  records: {
    marginTop: 20,
  },
  record: {
    position: "relative",
    padding: 15,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
  },
  recordText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default Sales;
