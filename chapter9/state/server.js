import jsonOverTcp from "json-over-tcp-2";
const server = jsonOverTcp.createServer({ port: 5000 });

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    console.log("Client data", data); // prints the recieved data from client
  });
});
server.listen(5000, () => console.log('Server started'));
// failSafeSOcket is just a demo example, with many missing functionnalities, we could think about ZeroMq package for production uses
