import { useContext, useEffect, useState } from "react";


// Emotion
setEmotion(d.emotion);


// Audio playback
if (d.audio) playAudio(d.audio);


// Viseme animation sync
d.visemes.forEach((v) => {
setTimeout(() => {
setViseme(v.value);
}, v.time * 1000);
});
}
};
}, [ws]);


const sendMessage = () => {
if (ws && msg.trim()) {
ws.send(msg);
setMsg("");
}
};


return (
<ScrollView style={{ padding: 20 }}>
<AvatarFace viseme={viseme} />
<AvatarEmotion emotion={emotion} />


{messages.map((m, i) => (
<View key={i} style={{ marginVertical: 10 }}>
<Text>User: {m.query}</Text>
<Text>AI: {m.response}</Text>
</View>
))}


<TextInput
placeholder="Type something..."
value={msg}
onChangeText={setMsg}
style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
/>


<Button title="Send" onPress={sendMessage} />
</ScrollView>
);
}