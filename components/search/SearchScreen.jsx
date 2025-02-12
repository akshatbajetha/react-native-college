import { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";

export const SearchScreen = () => {
  const API_KEY = "1b056c244bac980e82db43169e7b1ac3";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (error) {
      alert("Error while fetching weather data");
    }
  };
  return (
    <>
      <View>
        <TextInput placeholder="Enter city" onChangeText={setCity} />
      </View>
      <Button onPress={fetchWeather} title="Get Weather" />
      {weather && <Text>{`Temperature : ${weather.main.temp}`}</Text>}
    </>
  );
};
