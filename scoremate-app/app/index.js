import React, { useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"; 
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    iconType: "Feather",
    icon: "users",
    title: "Track every move effortlessly",
    description: "Keep score of all your favourite card and group games in one place.",
  },
  {
    id: "2",
    iconType: "Feather",
    icon: "refresh-ccw",
    title: "Everyone sees the scores live",
    description: "Real-time updates keep all players in sync throughout the game.",
  },
  {
    id: "3",
    iconType: "MaterialCommunityIcons",
    icon: "crown-outline",
    title: "Stay ad-free with ScoreMate Premium",
    description: "Unlock the best experience with our premium subscription.",
  },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/(login)");
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderIcon = (item) => {
    if (item.iconType === "Feather") {
      return <Feather name={item.icon} size={96} color="#00BFFF" />;
    }
    if (item.iconType === "FontAwesome5") {
      return <FontAwesome5 name={item.icon} size={96} color="#00BFFF" />;
    }
    if (item.iconType === "MaterialCommunityIcons") {
      return <MaterialCommunityIcons name={item.icon} size={96} color="#00BFFF" />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212",paddingBottom: 60, }}>
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              alignItems: "center",
              paddingTop: 140, // reduced top spacing
              paddingHorizontal: 20,
              
            }}
          >
            {/* Icon with background */}
            <View
              style={{
                backgroundColor: "#2A2A2A",
                borderRadius: 16,
                padding: 30,
                marginBottom: 30,
                width: 329,
                height: 256,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderIcon(item)}
            </View>

            {/* Text */}
            <Text
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "#aaa",
                fontSize: 16,
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={slidesRef}
      />

      {/* Swiping dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              height: 6,
              width: index === currentIndex ? 20 : 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? "#00BFFF" : "#555",
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      {/* Next / Start Now button */}
      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: "#00BFFF",
          marginHorizontal: 40,
          marginBottom: 8,
          borderRadius: 14,
          paddingVertical: 14,
          alignItems: "center",
          width: 329,
          height: 56,
        }}
      >
        <Text style={{ color: "#121212", fontSize: 20, fontWeight: "600" }}>
          {currentIndex === slides.length - 1 ? "Start Now" : "Next   >"}
        </Text>
      </TouchableOpacity>

      {/* Only show login text on last slide */}
      {currentIndex === slides.length - 1 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
            height: 56,
           
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => console.log("Login pressed!")}>
            <Text style={{ color: "#00BFFF", fontSize: 14, fontWeight: "600" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
