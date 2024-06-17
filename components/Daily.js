// HourlyWeather.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

const HourlyWeather = ({ apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchHourlyWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/uganda?unitGroup=us&key=6X43G6FDKMBRFCPY8JTL88FXB&contentType=json"
          // `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&key=${apiKey}&contentType=json`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("Error fetching hourly weather data");
        setLoading(false);
      }
    };

    fetchHourlyWeatherData();
  }, [apiKey, latitude, longitude]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Daily Weather Forecast</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {weatherData.days[0].hours.map((hourlyData, index) => (
          <View key={index} style={styles.hourlyContainer}>
            <Text style={styles.hourlyText}>Time: {hourlyData.datetime}</Text>
            <Text style={styles.hourlyText}>
              Temperature: {hourlyData.temp} °F
            </Text>
            <Text style={styles.hourlyText}>
              Description: {hourlyData.conditions}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  scrollView: {
    width: "100%",
    padding: 20,
  },
  hourlyContainer: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    // width: "100%",
  },
  hourlyText: {
    fontSize: 16,
  },
});

export default HourlyWeather;
