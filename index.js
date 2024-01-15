import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  method: ["GET", "POST"],
});

//socket implementation :----

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (msg) => {
    console.log("message ===> ", msg);
    io.emit("recive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
