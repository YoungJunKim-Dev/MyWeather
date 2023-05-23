import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const WEATHER_API_KEY = "2834387742b25d5393a21e88fee8246a";
  const GEO_API_KEY = "AIzaSyCBeW_-45ECOhQ1kucRA_yqdyKE-njE6zE";

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    Location.setGoogleApiKey(GEO_API_KEY);
    const loc = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(loc[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const json = await response.json();
    const li = json.list;
    console.log(typeof [1, 2, 3]);
    const newli = li[0];
    setDays(li);
    console.log(newli);
    console.log(days);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) => {
            console.log(day);
            return (
              <View key={index} style={styles.day}>
                <Text style={styles.dayText}>{day.dt_txt}</Text>
                <Text style={styles.weatherName}>{day.weather[0].main}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
  },
  weather: {
    backgroundColor: "skyblue",
  },
  day: {
    width: SCREEN_WIDTH,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 80,
    fontWeight: "600",
  },
  weatherName: {
    fontSize: 60,
  },
});
