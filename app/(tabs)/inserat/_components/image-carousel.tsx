import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { View,  FlatList, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const ImageCarousel = ({ images }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const {width} = Dimensions.get("window");

  return (
    <View className="relative w-full">
      {/* Image Slider */}
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <Image 
          source={{ uri: item.url }} 
          style={{ width: width, height: 240, borderRadius: 10 }} // Set width dynamically
        />
        )}
      />

      {/* Pagination Dots */}
      <View className="absolute bottom-3 left-0 right-0 flex-row justify-center">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-1 h-1 mx-1 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </View>

      {/* Image Counter */}
      <View className="space-x-2 absolute bottom-2 right-2 bg-[#161923] px-2 py-1 rounded-lg flex flex-row items-center">
        <MaterialCommunityIcons name="image" 
        size={16}
        color={"white"}
        />
        <Text className="text-gray-200/80 font-semibold text-sm">
          {currentIndex + 1}/{images.length}
        </Text>
      </View>
    </View>
  );
};

export default ImageCarousel;
