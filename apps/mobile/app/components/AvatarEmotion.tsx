import { View, Text } from "react-native";


export default function AvatarEmotion({ emotion }) {
const colors = {
happy: "orange",
sad: "blue",
angry: "red",
excited: "purple",
calm: "green",
confused: "gray",
neutral: "black",
};


return (
<View style={{ marginVertical: 10 }}>
<Text style={{ fontSize: 24, color: colors[emotion] || "black" }}>
Emotion: {emotion}
</Text>
</View>
);
}