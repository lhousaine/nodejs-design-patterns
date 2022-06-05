import { createServer } from "http";
import staticHandler from "serve-handler";
import webSocket, { WebSocketServer } from "ws";
import yargs from "yargs";
import zmq from "zeromq";
// (1)
// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: "www" });
});

let pubSocket;
async function initializeSockets() {
  // create our Publisher socket and bind it to the port provided.
  pubSocket = new zmq.Publisher();
  await pubSocket.bind(`tcp://127.0.0.1:${yargs.argv.pub}`);

  // create the Subscriber socket and we connect it to the Publisher sockets of the other instances of our application
  const subSocket = new zmq.Subscriber();
  const subPorts = [].concat(yargs.argv.sub);// ports of targetd publisher sockets
  for (const port of subPorts) {
    console.log(`Subscribing to ${port}`);
    subSocket.connect(`tcp://127.0.0.1:${port}`); // connect the subscriber sockets to the publisher sockets of our application instances
  }
  subSocket.subscribe("chat"); // create actual subscription, filter only messageds that begin with chat.
  for await (const [msg] of subSocket) { // listen for incoming messages, subSocket is async iterable
    console.log(`Message from another server: ${msg}`);
    broadcast(msg.toString().split(" ")[1]); // parse and remove chat prefix, then broadcast the message
  } // (4)
}
initializeSockets();
const wss = new WebSocketServer({ server });
wss.on("connection", (client) => {
  console.log("Client connected");
  client.on("message", (msg) => {
    console.log(`Message: ${msg}`);
    broadcast(msg);
    pubSocket.send(`chat ${msg}`); // publish the received message
  });
});
// broadcast every recieved message to all the connected clients.
function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === webSocket.OPEN) {
      client.send(msg);
    }
  }
}
server.listen(yargs.argv.http || 8080);
