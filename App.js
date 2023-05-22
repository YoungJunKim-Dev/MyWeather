import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.dayText}>27</Text>
          <Text style={styles.weatherName}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayText}>27</Text>
          <Text style={styles.weatherName}>Sunny</Text>
        </View>
      </ScrollView>
      <Text>Temp!</Text>
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
    backgroundColor: "orange",
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
    fontSize: 200,
    fontWeight: "600",
  },
  weatherName: {
    fontSize: 60,
  },
});
