import { createContext, useEffect, useState } from "react";
import { Slot } from "expo-router";


export const WSContext = createContext(null);


function connectWS(setWs) {
let socket = new WebSocket("ws://192.168.0.101:5000"); // Use your PC LAN IP


socket.onopen = () => console.log("WS connected");


socket.onclose = () => {
console.log("WS disconnected. Reconnecting...");
setTimeout(() => connectWS(setWs), 2000);
};


socket.onerror = (err) => {
console.log("WS error:", err);
socket.close();
};


setWs(socket);
}


export default function RootLayout() {
const [ws, setWs] = useState(null);


useEffect(() => {
connectWS(setWs);
}, []);


return (
<WSContext.Provider value={ws}>
<Slot />
</WSContext.Provider>
);
}