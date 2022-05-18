import { EventEmitter } from "events";

class DB extends EventEmitter {

  connected = false;
  commandsQueue = [];

  /**
   If the component has not been initialized, we create a command from the parameters
received with the current invocation and push it to the commandsQueue array.
When the command is executed, it will run the original query() method
again and forward the result to the Promise we are returning to the caller.
   */
  async query(queryString) {
    if (!this.connected) {
      console.log(`Request queued: ${queryString}`);
      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject);
        };
        this.commandsQueue.push(command);
      });
    }
    // (1)
    console.log(`Query executed: ${queryString}`);
  }

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true;
      this.emit("connected");
      this.commandsQueue.forEach((command) => command());
      this.commandsQueue = [];
    }, 500);
  }
}
export const db = new DB();
