// Market.js
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
import { useNavigation } from "@react-navigation/native";
// import NotificationContext from "../NotificationContext";
import NotificationContext from "../NotificationContext ";
import Toast from "react-native-toast-message";

const Market = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [marketName, setMarketName] = useState("");
  const [numCustomers, setNumCustomers] = useState("");
  const [records, setRecords] = useState([]);
  const { addNotification } = useContext(NotificationContext);

  const navigation = useNavigation();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem("marketRecords");
      if (savedRecords !== null) {
        setRecords(JSON.parse(savedRecords));
      }
    } catch (error) {
      console.error("Failed to load records from storage", error);
    }
  };

  const saveRecords = async (newRecords) => {
    try {
      await AsyncStorage.setItem("marketRecords", JSON.stringify(newRecords));
    } catch (error) {
      console.error("Failed to save records to storage", error);
    }
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    if (!marketName.trim() || !numCustomers.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newRecord = {
      marketName,
      numCustomers,
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    saveRecords(updatedRecords);

    addNotification(`New Market Added: ${marketName}`);

    // Show toast notification
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: `New Market Added: ${marketName}`,
    });

    setMarketName("");
    setNumCustomers("");
    setFormVisible(false);
  };

  const handleDeleteRecord = (index) => {
    const deletedRecord = records[index];
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    saveRecords(updatedRecords);

    addNotification(`Market Deleted: ${deletedRecord.marketName}`);

    // Show toast notification
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: `Market Deleted: ${deletedRecord.marketName}`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleForm}>
        <Text style={styles.buttonText}>
          {isFormVisible ? "Close" : "Add Market"}
        </Text>
      </TouchableOpacity>
      {isFormVisible && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Market Name"
            value={marketName}
            onChangeText={setMarketName}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Customers"
            value={numCustomers}
            onChangeText={setNumCustomers}
            keyboardType="numeric"
          />
          <Button title="Add Market" color={"#65000B"} onPress={handleSubmit} />
        </View>
      )}
      <View style={styles.records}>
        {records.map((record, index) => (
          <View key={index} style={styles.record}>
            <View style={styles.recordTextContainer}>
              <Text style={styles.boldText}>Market Name:</Text>
              <Text style={styles.recordText}>{record.marketName}</Text>
              <Text style={styles.boldText}>Number of Customers:</Text>
              <Text style={styles.recordText}>{record.numCustomers}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteRecord(index)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  records: {
    marginTop: 20,
  },
  record: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
  },
  recordTextContainer: {
    flex: 1,
  },
  recordText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#65000B",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default Market;
