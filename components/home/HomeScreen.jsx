import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const HomeScreen = () => {
  const API_KEY = "1b056c244bac980e82db43169e7b1ac3";
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (lat, lon) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (error) {
      alert("Error while fetching weather data");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      console.log("Coordiantes : ", lat, lon);

      fetchWeather(lat, lon);
    })();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        <View>
          <Text
            style={styles.tempText}
          >{`Temperature : ${weather.main.temp}°C`}</Text>
          <Text
            style={styles.tempText}
          >{`Current Location : ${weather.name}`}</Text>
          <Text
            style={styles.tempText}
          >{`Country Code : ${weather.sys.country}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tempText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
