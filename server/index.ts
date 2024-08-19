import { socket } from '@/lib/utils/socketService';
import { conversation } from '../db/schema';

const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://192.168.178.45:8081/",
  },
});




const PORT = 4000;

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let chatgroups = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


socketIO.on("connection", (socket) => {

 

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
  });

  socket.on("createNewGroup", (currentGroupName) => {
    console.log(currentGroupName);
    chatgroups.unshift({
      id: chatgroups.length + 1,
      currentGroupName,
      messages: [],
    });
    socket.emit("groupList", chatgroups);
  });

  socket.on("newMessage", (data) => {
    
    socket.emit(data.conversationId, data.sendMessage);
  })

  socket.on("findGroup", (id) => {
    const filteredGroup = chatgroups.filter((item) => item.id === id);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });

  socket.on("newChatMessage", (data) => {
    const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;
    const filteredGroup = chatgroups.filter(
      (item) => item.id === groupIdentifier
    );
    const newMessage = {
      id: createUniqueId(),
      text: currentChatMesage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
    };

    console.log(filteredGroup[0].currentGroupName);
    console.log(222222);

    socket
      .to(filteredGroup[0].currentGroupName)
      .emit("groupMessage", newMessage);
    filteredGroup[0].messages.push(newMessage);
    socket.emit("groupList", chatgroups);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });
});

app.get("/api", (req, res) => {
  res.json(chatgroups);
});

http.listen(PORT, () => {
  console.log(`Server is listeing on ${PORT}`);
});


app.post('/api/messages/synchronize', async (req, res) => {
  try {
    console.log(1)

    console.log(req.body)
    const sendMessage = await req.body;
    console.log(sendMessage.conversationId)
    socketIO.emit(sendMessage.conversationId, sendMessage);
    

    res.status(200).json({ message: "Message send" });

  } catch (e: any) {
    res.status(500).json({ message: "Server Error" });
  }
})
