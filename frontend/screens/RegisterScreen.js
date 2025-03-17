import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const phone = route.params?.phone || ""; // Get phone number from previous screen

  useEffect(() => {
    console.log("📞 Received phone number in RegisterScreen:", phone);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Успех", "Регистрация завершена!");
        navigation.navigate("LoginScreen"); // Move to login screen
      } else {
        Alert.alert("Ошибка", data.error);
      }
    } catch (error) {
      Alert.alert("Ошибка сервера", "Попробуйте снова позже");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создайте логин и пароль</Text>

      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Логин" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Пароль" secureTextEntry />
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Повторите пароль" secureTextEntry />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15, padding: 10 },
  button: { backgroundColor: "#4a5a84", padding: 12, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default RegisterScreen;
