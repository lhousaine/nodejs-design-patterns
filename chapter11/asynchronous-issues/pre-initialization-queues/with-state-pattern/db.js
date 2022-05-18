import { EventEmitter } from 'events';
import { QueuingState } from './queuing-state.js';

class DB extends EventEmitter {
  constructor() {
    super();
    this.state = new QueuingState(this);
  }
  async query(queryString) {
    return this.state.query(queryString);
  }
  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true;
      this.emit("connected");
      const oldState = this.state;
      this.state = new InitializedState(this);
      oldState[deactivate] && oldState[deactivate]();
    }, 500);
  }
}
export const db = new DB();
