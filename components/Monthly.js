import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

const MonthlyWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.weatherstack.com/current",
          {
            params: {
              access_key: "d0581b4a475919ddcad209754b74eaca",
              query: "uganda",
            },
          }
        );
        const apiResponse = response.data;
        setTemperature(apiResponse.current.temperature);
        setLocation(apiResponse.location.name);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Current temperature in {location} is {temperature}°C
      </Text>
    </View>
  );
};

export default MonthlyWeather;
