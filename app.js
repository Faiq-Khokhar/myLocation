const express = require("express");
const path = require("path");
const app = express();

const http = require("http");

const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data })
    })
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})

app.get("/", (req, res) => {
    res.render("index");
})

module.exports = app;