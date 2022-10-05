const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(senderId, receiverId, text);
    // io.emit("receiveMessage", text);
    const user = getUser(receiverId);
    console.log(users);
    // io.to(user.socketId).emit("getMessage", {
    //   senderId,
    //   text,
    // });
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
