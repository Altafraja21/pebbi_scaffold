import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";


export function useMic(ws) {
let recording = null;


async function start() {
await Audio.requestPermissionsAsync();


recording = new Audio.Recording();
await recording.prepareToRecordAsync(
Audio.RecordingOptionsPresets.HIGH_QUALITY
);


await recording.startAsync();
}


async function stop() {
if (!recording) return;


await recording.stopAndUnloadAsync();
const uri = recording.getURI();


const base64 = await FileSystem.readAsStringAsync(uri, {
encoding: FileSystem.EncodingType.Base64,
});


ws.send(
JSON.stringify({
type: "audio_chunk",
data: base64,
})
);


recording = null;
}


return { start, stop };
}