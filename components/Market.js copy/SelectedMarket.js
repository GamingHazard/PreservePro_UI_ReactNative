import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectedMarket = () => {
  const navigation = useNavigation();
  const [isFormVisible, setFormVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const savedCustomers = await AsyncStorage.getItem("customers");
      if (savedCustomers !== null) {
        setCustomers(JSON.parse(savedCustomers));
      }
    } catch (error) {
      console.error("Failed to load customers from storage", error);
    }
  };

  const saveCustomers = async (newCustomers) => {
    try {
      await AsyncStorage.setItem("customers", JSON.stringify(newCustomers));
    } catch (error) {
      console.error("Failed to save customers to storage", error);
    }
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    const newCustomer = {
      name: customerName,
      phone: customerPhone,
    };

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);

    // Clear the form fields
    setCustomerName("");
    setCustomerPhone("");
    setFormVisible(false); // Hide form after submission
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image source={require("../../assets/map.jpg")} />
      </View>
      <Text style={styles.title}>Customers</Text>
      <ScrollView>
        {customers.map((customer, index) => (
          <View key={index} style={styles.tab}>
            <Text style={{ width: "80%" }}>{customer.name}</Text>
            <Text style={{ alignSelf: "flex-end" }}>{customer.phone}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={toggleForm} style={styles.addBtn}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
      {isFormVisible && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Customer Contact"
            value={customerPhone}
            onChangeText={setCustomerPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectedMarket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    paddingTop: 20,
    top: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 8,
    marginVertical: 5,
  },
  mapContainer: {
    height: 300,
    width: "100%",
    elevation: 8,
    backgroundColor: "white",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 10,
  },
  formContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 8,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  submitBtn: {
    backgroundColor: "#65000B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
