const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const roomConnections = [
  {members: [1, 2], roomName: 1},
  {members: [1, 3], roomName: 2},
  {members: [3, 4], roomName: 3},
  {members: [5, 6], roomName: 4},
  {members: [2, 3], roomName: 5},
  {members: [3, 3], roomName: 6},
  {members: [4, 1], roomName: 7}
];

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // socket.emit("chat-message", "Hello World");
  console.log(`${socket.id} has just connected!`);

  // io.emit("Hello users");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    let roomArray = [];
    roomConnections.forEach((connection) => {
      if (connection.members.includes(userId)) {
        socket.join(connection.roomName);
        roomArray.push(connection);
        console.log(`Rooms: User ${userId} connected to Room ${connection.roomName}`);
      }
    })
    io.to(socket.id).emit('getRooms', roomArray);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, roomNumber }) => {
    console.log(senderId, receiverId, text);
    // io.emit("receiveMessage", text);
    const user = getUser(receiverId);
    console.log("user from SendMessage:", user);
    io.to(roomNumber).emit("getMessage", {
      senderId,
      text,
      roomNumber,
    });
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
