import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import apiKeys from "./apiKeys";

//screen width
const { width: SCREEN_WIDTH } = Dimensions.get("window");

//API_KEYS
const WEATHER_API_KEY = apiKeys.WEATHER_API_KEY;
const GEO_API_KEY = apiKeys.GEO_API_KEY;

//icons
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
};

export default function App() {
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
    setDays(li);
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
          <View style={styles.indicator}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) => {
            return (
              <View key={index} style={styles.day}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.temp}>{day.main.temp}</Text>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={68}
                    color="white"
                  />
                </View>
                <Text style={styles.weatherName}>{day.weather[0].main}</Text>
                <Text style={styles.dayText}>
                  {day.dt_txt.slice(5, 13) + "'"}
                </Text>
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
    backgroundColor: "#F2BED1",
    padding: 20,
  },
  city: {
    flex: 1,
    backgroundColor: "#F2BED1",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
    width: "100%",
  },
  cityName: {
    fontSize: 80,
    color: "white",
    fontWeight: 600,
  },
  weather: {
    backgroundColor: "#F2BED1",
  },
  indicator: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: "#F2BED1",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: "#F2BED1",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  temp: {
    fontSize: 100,
    fontWeight: "600",
    color: "white",
  },
  dayText: {
    fontSize: 60,
    color: "white",
  },
  weatherName: {
    fontSize: 60,
    color: "white",
  },
});
