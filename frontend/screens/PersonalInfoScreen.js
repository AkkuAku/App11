import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function PersonalInfoScreen({ navigation, route }) {
  const { role } = route.params || {}; // Получаем роль из параметров
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = async () => {
    if (!fullName || !email || !birthDate || !gender || !phone) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
console.log("Selected Role:", role);  // Проверка, передается ли роль

    try {
      const response = await fetch("https://app11-5.onrender.com/personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, birthDate, gender, phone, role }), // Добавляем роль
      });

      const data = await response.json();

      if (response.ok) {
        alert("Код подтверждения отправлен на ваш телефон");
        navigation.navigate("ConfirmationScreen", { phone });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Ошибка сервера");
      console.error(error);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Личная информация</Text>
      <Text style={styles.subtitle}>Заполните поля ниже</Text>

      <Text style={styles.label}>ФИО</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Введите ФИО" />

      <Text style={styles.label}>Почта</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Введите почту" keyboardType="email-address" />

      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>Дата рождения</Text>
          <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} placeholder="ДД.ММ.ГГГГ" keyboardType="numeric" />
        </View>

        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>Пол</Text>
          <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="М/Ж" />
        </View>
      </View>

      <Text style={styles.label}>Телефон</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+7 (___) ___-__-__" keyboardType="phone-pad" />

      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Дальше</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginLink}>У вас есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
    subtitle: { fontSize: 16, color: "#777", marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 5 },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 15,
      backgroundColor: "#F5F5F5",
    },
    row: { flexDirection: "row", justifyContent: "space-between" },
    halfInputContainer: { width: "48%" },
    button: { backgroundColor: "#4A5FC1", padding: 15, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
    loginLink: { color: "#4A5FC1", textAlign: "center", marginTop: 15, fontSize: 16 },
  });
