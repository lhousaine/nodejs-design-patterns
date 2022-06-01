import { createServer } from "http";
import staticHandler from "serve-handler";
import webSocket, { WebSocketServer } from "ws";
import Redis from "ioredis";

const redisSub = new Redis();
const redisPub = new Redis();
// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: "www" });
});
// (1) create an http server and forward every request to to a special handler, which will take care to serve all the static files from the www directory.

const wss = new WebSocketServer({ server }); // create a ws and attach it to our http server.
wss.on("connection", (client) => {
  // listen for incoming websockets client connections.
  console.log("Client connected");
  client.on("message", (msg) => {
    // listen for incoming messages
    console.log(`Message: ${msg}`);
    redisPub.publish("chat_messages", msg); // broadcast the message to all connected clients.
  });
}); 

redisSub.subscribe("chat_messages");
redisSub.on("message", (channel, msg) => {
  for (const client of wss.clients) {
    if (client.readyState === webSocket.OPEN) {
      client.send(msg);
    }
  }
});

server.listen(process.argv[2] || 8080);
