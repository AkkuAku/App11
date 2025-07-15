
import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, Image, ActivityIndicator, FlatList 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons"; 
import { ScrollView } from "react-native";

const MAX_ITEMS = 3; // Максимальное количество элементов в списке

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  

  // Состояния для экзаменов, предметов специализации и языков обучения
  const [exams, setExams] = useState([]);
  const [examInput, setExamInput] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");

  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          alert("Ошибка: Вы не авторизованы!");
          navigation.navigate("LoginScreen");
          return;
        }

        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          alert("Ошибка: " + (data.error || "Не удалось загрузить профиль"));
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        alert("Ошибка сети, попробуйте снова");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.navigate("LoginScreen");
  };

  // Функции для добавления элементов
  const addExam = () => {
    if (examInput && exams.length < MAX_ITEMS) {
      setExams([...exams, examInput]);
      setExamInput("");
    }
  };

  const addSubject = () => {
    if (subjectInput && subjects.length < MAX_ITEMS) {
      setSubjects([...subjects, subjectInput]);
      setSubjectInput("");
    }
  };

  const addLanguage = () => {
    if (languageInput && languages.length < MAX_ITEMS) {
      setLanguages([...languages, languageInput]);
      setLanguageInput("");
    }
  };

  // Функции для удаления элементов
  const removeExam = (index) => {
    setExams(exams.filter((_, i) => i !== index));
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a5a84" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Мой профиль</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Личная информация</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Имя:</Text>
          <Text style={styles.value}>{profile.full_name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Дата рождения:</Text>
          <Text style={styles.value}>
            {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString("ru-RU") : "Дата не указана"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Телефон:</Text>
          <Text style={styles.value}>{profile.phone}</Text>
        </View>
      </View>
  
      <Text style={styles.label}>Город</Text>
      <TextInput
        style={styles.inputRow}
        placeholder="Введите город"
        value={city}
        onChangeText={setCity}
      />
  
      <Text style={styles.label}>Опыт работы</Text>
      <TextInput
        style={styles.inputRow}
        placeholder="Опишите ваш опыт"
        value={experience}
        onChangeText={setExperience}
      />
  
      <View style={styles.switchRow}>
        <Text style={styles.label}>Формат обучения:</Text>
        <Text style={styles.value}>{isOnline ? "Онлайн" : "Оффлайн"}</Text>
        <Switch value={isOnline} onValueChange={setIsOnline} />
      </View>
  
      <Text style={styles.label}>Дополнительная информация</Text>
      <TextInput
        style={[styles.inputRow, { height: 50 }]} // Меньше жесткой высоты
        placeholder="Расскажите о себе"
        multiline
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />

    

  {/* Готовите к экзаменам */}
  <View style={styles.rowContainer}>
  {/* Подготовка к экзаменам */}
  <View style={styles.examContainer}>
    <Text style={styles.label}>Готовите ли вы к сдаче экзаменов?</Text>
    
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Введите экзамен"
        value={examInput}
        onChangeText={setExamInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addExam} disabled={exams.length >= MAX_ITEMS}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.examsList}>
      {exams.map((exam, index) => (
        <View key={index} style={styles.tagContainer}>
          <Text style={styles.tagText}>{exam}</Text>
          <TouchableOpacity onPress={() => removeExam(index)}>
            <Text style={styles.removeText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </View>

  {/* Предмет специализации */}
  <View style={styles.subjectContainer}>
    <Text style={styles.label}>Предмет специализации</Text>

    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Введите предмет"
        value={subjectInput}
        onChangeText={setSubjectInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addSubject} disabled={subjects.length >= MAX_ITEMS}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>

    {subjects.map((subject, index) => (
      <View key={index} style={styles.tagContainer}>
        <Text style={styles.tagText}>{subject}</Text>
        <TouchableOpacity onPress={() => removeSubject(index)}>
          <Text style={styles.removeText}>✖</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>


      
<View style={styles.l}>
      {/* Язык обучения */}
      <Text style={styles.label}>Язык обучения</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Введите язык"
          value={languageInput}
          onChangeText={setLanguageInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addLanguage} disabled={languages.length >= MAX_ITEMS}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {languages.map((language, index) => (
        <View key={index} style={styles.tagContainer}>
          <Text style={styles.tagText}>{language}</Text>
          <TouchableOpacity onPress={() => removeLanguage(index)}>
            <Text style={styles.removeText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
       </View> 
       </View>    
    </ScrollView>
  
  
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
          backgroundColor: "#b11eadff",
      padding: 30,

    },
    header: {

      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
    profileCard: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      alignItems: "center",
      marginBottom: 20,
      width: 30,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
    },
    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#444",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#555",
    },
    
    value: {      
      fontSize: 16,
      color: "#333",
    },
    Tree: {
        flexDirection: "column",
        gap: 10, // отступ между элементами
      },
      
    inputRow: {
        flexDirection: "row", // Элементы будут располагаться по горизонтали
        alignItems: "center", // Вертикальное выравнивание элементов
        backgroundColor: "#fff",
        padding: 2,
        width: 200,
        borderRadius: 5,
        borderWidth: 0.1,
        borderColor: "#ddd",
        marginBottom: 10,
      },
      input: {
        flex: 1, // Занимает всю доступную ширину
        paddingVertical: 8,
        fontSize: 16,
      },
      addButton: {
        marginLeft: 20,
        backgroundColor: "#3F51B5",
        padding: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
      },
      addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
    
    tagContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E8EAF6",
      padding: 10,
      borderRadius: 8,
      marginVertical: 5,
    },
    tagText: {
      color: "#3F51B5",
      fontWeight: "bold",
      flex: 1,
    },
    removeText: {
      color: "red",
      fontWeight: "bold",
      marginLeft: 10,
    },


      rowContainer: {
        flexDirection: "row", // Размещает контейнеры в одну линию
        justifyContent: "space-between", // Распределяет пространство между контейнерами
        alignItems: "flex-start", // Выравнивание по верхнему краю
        width: "100%", // Полная ширина экрана
        flexWrap: "wrap",
      },
      l: {
        flex: 1, // Равномерное распределение пространства
        marginRight: 5, // Расстояние между контейнерами
      },
      examContainer: {
        flex: 1, // Равномерное распределение пространства
        marginRight: 5, // Расстояние между контейнерами
      },
      subjectContainer: {
        flex: 1, // Второй контейнер тоже занимает равную часть
        marginLeft: 5, // Отступ между контейнерами
      },
    });
    
  
  
  
  export default ProfileScreen;
