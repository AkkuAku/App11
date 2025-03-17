import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Импорт AsyncStorage
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Ошибка", "Введите логин и пароль");
      return;
    }
  

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Статус ответа:", response.status);
      console.log("Данные от сервера:", data);

      if (response.ok) {
        // ✅ Сохраняем токен
        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
          console.log("Токен сохранен:", data.token);
        }

        Alert.alert("Успех", "Вы вошли в систему!");
        navigation.navigate("Main", { user: data.user }); // Переход на главный экран
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
      <Text style={styles.title}>Вход</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Введите логин"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Введите пароль"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PersonalInfoScreen")}>
        <Text style={styles.registerText}>Нет аккаунта? Зарегистрируйтесь</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15, padding: 10 },
  button: { backgroundColor: "#4a5a84", padding: 12, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16 },
  registerText: { textAlign: "center", color: "#4a5a84", marginTop: 15 },
});

export default LoginScreen;
