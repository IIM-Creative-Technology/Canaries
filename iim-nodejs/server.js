const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");//used to format the messages to be sent to the client
const createAdapter = require("@socket.io/redis-adapter").createAdapter;//redis adapter is used to connect to redis server and store the data
const redis = require("redis");

require("dotenv").config();
const { createClient } = redis;
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");//used to get the user details from the users array

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Etienne";//bot name



// Run when client connects
io.on("connection", (socket) => {
    console.log(io.of("/").adapter);
    socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Bienvenue sur ChatBox!"));

    // Broadcast when a user connects
    socket.broadcast
        .to(user.room)
        .emit(
            "message",
            formatMessage(botName, `${user.username} a rejoint le chat`)
        );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
        });
    });

  // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

  // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

    if (user) {
        io.to(user.room).emit(
            "message",
            formatMessage(botName, `${user.username} a quitté la partie`)
        );

      // Send users and room info
    io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));