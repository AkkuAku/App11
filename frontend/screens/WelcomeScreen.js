import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Dimensions 
} from "react-native";

const { width, height } = Dimensions.get("window"); // Get full screen width and height

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground 
        source={require("../assets/Начальная страница.png")} 
        style={styles.background}
      />

      {/* Foreground Content */}
      <Image 
        source={require("../assets/Group.png")} 
        style={styles.image} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Найди своего </Text>
      <Text style={styles.title}> репетитора</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Selection")}>
        <Text style={styles.buttonText}>Начать →</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  background: {
    flex: 1,
    width: "100%", // Full width
    height: "100%", // Full height
    position: "absolute",
  },
  image: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.35, // 35% of screen height
    marginBottom: height * 0.1, // Adjust based on screen height
  },
  title: {
    fontSize: width * 0.03, // Scales with screen width
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  button: {
    backgroundColor: "#4A5FC1",
    paddingVertical: height * 0.01, // Adjust padding dynamically
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
    marginTop: height * 0.09, // Dynamic margin
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.02, // Scale text size
    fontWeight: "600",
  },
});
