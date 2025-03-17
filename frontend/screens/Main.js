import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Image, 
  StyleSheet, 
  Dimensions 
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MainScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("centers");

  // Заглушка списка репетиторов
  const tutors = [
    { id: "1", name: "Айбат", age: 18, subject: "Физика", price: "3000 Тг", city: "Атырау", image: require("../assets/image 1.png") },
    { id: "2", name: "Айкен", age: 19, subject: "Физика", price: "3000 Тг", city: "Атырау", image: require("../assets/Vector.png") },
  ];
  const centers = [
    { id: "1", name: "Outpeer", desc: "Центр Роботехники", city: "Астана", image: require("../assets/image 1.png") },
    { id: "2", name: "Bridge", desc: "Центр Математики", city: "Атырау", image: require("../assets/image 1.png") },
    { id: "3", name: "HiLondon", desc: "Центр Английского Языка", city: "Атырау", image: require("../assets/image 1.png") }
  ];

  return (
    <View style={styles.container}>
      {/* Вкладки */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === "centers" && styles.activeTab]}
          onPress={() => setSelectedTab("centers")}
        >
          <Text style={[styles.tabText, selectedTab === "centers" && styles.activeTabText]}>
            Образовательные центры
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, selectedTab === "tutors" && styles.activeTab]}
          onPress={() => setSelectedTab("tutors")}
        >
          <Text style={[styles.tabText, selectedTab === "tutors" && styles.activeTabText]}>
            Индивидуальные репетиторы
          </Text>
        </TouchableOpacity>
      </View>

      {/* Поисковая строка */}
      <TextInput style={styles.searchBar} placeholder="🔍 Поиск" />

      {/* Фильтры (заглушка) */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}><Text>Город ▼</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Предмет ▼</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Цена ▼</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Формат ▼</Text></TouchableOpacity>
      </View>

    {/* Список образовательных центров (если выбрана вкладка "Образовательные центры") */}
    {selectedTab === "centers" && (
  <FlatList
    data={centers}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.tutorCard}>
        <Image source={item.image} style={styles.tutorImage} />
        <View style={styles.tutorInfo}>
          <Text style={styles.tutorName}>{item.name}</Text>
          <Text style={styles.tutorText}>
            <Text style={styles.boldText}>Описание -</Text> {item.desc}
          </Text>
          <Text style={styles.tutorText}>
            <Text style={styles.boldText}>Город -</Text> {item.city}
          </Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    )}
  />
)}



{/* Список репетиторов (если выбрана вкладка "Индивидуальные репетиторы") */}
{selectedTab === "tutors" && (
  <FlatList
    data={tutors}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.tutorCard}>
        <Image source={item.image} style={styles.tutorImage} />
        <View style={styles.tutorInfo}>
          <Text style={styles.tutorName}>{item.name} {item.age} Лет</Text>
          <Text style={styles.tutorText}><Text style={styles.boldText}>Предмет -</Text> {item.subject}</Text>
          <Text style={styles.tutorText}><Text style={styles.boldText}>Цена -</Text> {item.price}</Text>
          <Text style={styles.tutorText}><Text style={styles.boldText}>Город -</Text> {item.city}</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    )}
  />
)}

      {/* Навигация (заглушка) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
  <Text>👤</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#E0E6F0",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#4A5FC1",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    margin: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#E0E6F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tutorCard: {
    backgroundColor: "#E0E6F0",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tutorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tutorText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#4A5FC1",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

