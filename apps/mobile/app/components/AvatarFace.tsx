import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";


const AnimatedPath = Animated.createAnimatedComponent(Path);


export default function AvatarFace({ viseme }) {
const animatedProps = useAnimatedProps(() => {
const mouthShapes = {
A: "M20 40 Q40 60 60 40",
E: "M20 40 Q40 50 60 40",
O: "M20 40 Q40 70 60 40",
default: "M20 40 Q40 40 60 40",
};


return {
d: mouthShapes[viseme] || mouthShapes.default,
};
});


return (
<Svg width="120" height="120">
<AnimatedPath
animatedProps={animatedProps}
stroke="black"
strokeWidth="4"
fill="none"
/>
</Svg>
);
}