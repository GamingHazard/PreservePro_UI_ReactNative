import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Tips = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfManufacture, setDateOfManufacture] = useState("");
  const [description, setDescription] = useState("");
  const [records, setRecords] = useState([]);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    const newRecord = {
      productName,
      quantity,
      weight,
      dateOfManufacture,
      description,
    };

    setRecords([...records, newRecord]);

    // Clear the form fields
    setProductName("");
    setQuantity("");
    setWeight("");
    setDateOfManufacture("");
    setDescription("");
    setFormVisible(false); // Hide form after submission
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleForm}>
        <Text style={styles.buttonText}>
          {isFormVisible ? "Hide Form" : "Show Form"}
        </Text>
      </TouchableOpacity>
      {isFormVisible && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Manufacture"
            value={dateOfManufacture}
            onChangeText={setDateOfManufacture}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
      <View style={styles.records}>
        {records.map((record, index) => (
          <View key={index} style={styles.record}>
            <Text style={styles.recordText}>
              Product Name: {record.productName}
            </Text>
            <Text style={styles.recordText}>Quantity: {record.quantity}</Text>
            <Text style={styles.recordText}>Weight: {record.weight}</Text>
            <Text style={styles.recordText}>
              Date of Manufacture: {record.dateOfManufacture}
            </Text>
            <Text style={styles.recordText}>
              Description: {record.description}
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
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
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
  records: {
    marginTop: 20,
  },
  record: {
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
});

export default Tips;
