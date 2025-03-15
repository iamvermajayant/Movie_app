import { images } from "@/constants/images";
import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute top-0 left-0 w-full h-full" />
    </View>
  );
}
