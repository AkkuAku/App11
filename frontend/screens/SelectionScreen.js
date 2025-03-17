import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function SelectionScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/Group 129.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Custom Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={height * 0.035} color="black" />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Кто вы?</Text>

        <TouchableOpacity
  style={styles.option}
  onPress={() => navigation.navigate("PersonalInfoScreen", { role: "tutor" })}
>
  <Text style={styles.optionText}>Я репетитор</Text>
</TouchableOpacity>




        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Я ученик</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Образовательный центр</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: height * 0.01, // Adjusted for different screen sizes
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
  },
  subtitle: {
    fontSize: height * 0.04, // Adjusts to screen height
    fontWeight: "bold",
    marginBottom: height * 0.03,
    color: "#4A5FC1",
  },
  option: {
    borderWidth: 2,
    borderColor: "#4A5FC1",
    paddingVertical: height * 0.015, // Dynamic padding
    paddingHorizontal: width * 0.15,
    borderRadius: 25,
    marginVertical: height * 0.01,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Improved readability
  },
  optionText: {
    color: "#4A5FC1",
    fontSize: height * 0.025, // Scaled text
    fontWeight: "600",
  },
});
