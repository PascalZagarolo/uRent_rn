

//https://codesandbox.io/s/pusher-demo-kin46x?file=/src/index.js
//https://codesandbox.io/s/pusher-demo-kin46x?file=/src/index.js

import { Pusher } from "@pusher/pusher-websocket-react-native";


const pusher = Pusher.getInstance()

export const connectPusher = async () => {
    try {
      await pusher.init({
        apiKey : process.env.PUSHER_APP_KEY,
        cluster : "eu",
        authEndpoint : ""
      })
      await pusher.connect();

      return pusher;
    } catch(e : any) {
      console.log(e);
    }
}