import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ConfirmationScreen({ navigation, route }) {
  const [code, setCode] = useState("");
  const phone = route.params?.phone || ""; // Get phone number from previous screen

  const handleConfirm = async () => {
    if (code.length !== 4) {
      alert("Введите корректный 4-значный код");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Код подтвержден. Теперь создайте логин и пароль.");
        navigation.navigate("RegisterScreen", { phone });
      } else {
        alert(data.error); // Show error if code is incorrect
      }
    } catch (error) {
      alert("Ошибка сервера. Попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтверждение</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        value={code}
        onChangeText={setCode}
        placeholder="Введите код"
      />
      
      <TouchableOpacity onPress={handleConfirm} style={styles.button}>
        <Text style={styles.buttonText}>Готово</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert("Код отправлен заново")}>
        <Text style={styles.resendCode}>Отправить еще раз</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "60%",
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A5FC1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resendCode: { color: "#4A5FC1", marginTop: 20, fontSize: 16 },
});
