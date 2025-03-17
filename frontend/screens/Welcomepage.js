import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро</Text>
      <Text style={styles.title}>Пожаловать</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Main")}>
        <Text style={styles.buttonText}>Дальше</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    paddingHorizontal: width * 0.1
  },
  title: { 
    fontSize: height * 0.04, 
    fontWeight: "bold", 
    textAlign: "center", 
    color: "#000",
    marginBottom: height * 0.01
  },
  button: { 
    backgroundColor: "#4A5FC1", 
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.3, 
    borderRadius: 10, 
    marginTop: height * 0.03
  },
  buttonText: { 
    color: "#fff", 
    fontSize: height * 0.022, 
    fontWeight: "600", 
    textAlign: "center" 
  }
});
