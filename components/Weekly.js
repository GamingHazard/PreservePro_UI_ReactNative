import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const WeeklyWeather = ({ latitude, longitude, apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const options = {
        method: "GET",
        url: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=14&key=5e3cdb0fcfff422ba367cffc10a6b7f7`,
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, apiKey]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Weekly Weather Forecast for {"\n"}
        {weatherData.city_name}
      </Text>
      <FlatList
        data={weatherData.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>Valid Date: {item.valid_date}</Text>
            <Text>Temperature: {item.temp}°C</Text>
            <Text>Max Temperature: {item.max_temp}°C</Text>
            <Text>Min Temperature: {item.min_temp}°C</Text>
            <Text>Wind Speed: {item.wind_spd} m/s</Text>
            <Text>Wind Direction: {item.wind_cdir_full}</Text>
            <Text>Weather: {item.weather.description}</Text>
            <Text>Cloud Coverage: {item.clouds}%</Text>
            <Text>Visibility: {item.vis} km</Text>
            <Text>Pressure: {item.pres} hPa</Text>
            <Text>Humidity: {item.rh}%</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default WeeklyWeather;
