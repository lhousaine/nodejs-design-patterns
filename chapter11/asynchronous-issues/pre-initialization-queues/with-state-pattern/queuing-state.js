const METHODS_REQUIRING_CONNECTION = ["query"];

const deactivate = Symbol("deactivate");

/** In the queuing state, we specify all the methods that will require db initialisation,
 * so we create a command that will call them and queue to our queue 
 */
export class QueuingState { 
  constructor(db) {
    this.db = db;
    this.commandsQueue = [];
    METHODS_REQUIRING_CONNECTION.forEach((methodName) => {
      this[methodName] = function (...args) {
        console.log("Command queued:", methodName, args);
        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args).then(resolve, reject);
          };
          this.commandsQueue.push(command);
        });
      };
    });
  }
  [deactivate]() {
    this.commandsQueue.forEach((command) => command());
    this.commandsQueue = [];
  }
}
