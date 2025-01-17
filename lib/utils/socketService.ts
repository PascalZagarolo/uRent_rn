
import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android" ? "http://192.168.178.45:8081/" : "http://localhost:8081";



export const socket = io("ws://192.168.178.45:4000");