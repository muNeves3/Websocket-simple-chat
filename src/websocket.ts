import { io } from "./http";

interface IRoomUser {
  socketId: string;
  username: string;
  room: string;
}

interface IRoomMessage {
  message: string;
  username: string;
  room: string;
  createdAt: Date;
}

const users: IRoomUser[] = [];
const messages: IRoomMessage[] = [];

io.on("connection", (socket) => {
  socket.on("new_room", data => {
    io.emit("new_room", data)
    console.log(data)
  });

  socket.on("select_room", (data, callback) => {
    const { room, username } = data;

    socket.join(room);

    const userInRoom = users.find(
      (user) => user.username === username && user.room == room
    );

    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      users.push({
        room,
        username,
        socketId: socket.id,
      });
    }

    const messagesRoom = getMessagesRoom(room);
    callback(messagesRoom);
  });

  socket.on("message", (data) => {
    const { room, username, message } = data;
    const newMessage: IRoomMessage = {
      room,
      username,
      message,
      createdAt: new Date(),
    };

    messages.push(newMessage);

    io.to(room).emit("message", newMessage);
  });
});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}
