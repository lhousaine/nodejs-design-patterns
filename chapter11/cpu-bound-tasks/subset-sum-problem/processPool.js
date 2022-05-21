import { fork } from "child_process";

export class ProcessPool {
  constructor(file, poolMax) {
    this.file = file; // represent the program to run
    this.poolMax = poolMax; // the number of instances in the pool
    this.pool = []; // a set of running processes ready to be used.
    this.active = []; // a set of processes currently being used
    this.waiting = []; //contains a queue of callbacks for all those requests that could not be fulfilled
    // immediately because of the lack of an available process.
  }
  acquire() {
    return new Promise((resolve, reject) => {
      let worker;
      if (this.pool.length > 0) {
        worker = this.pool.pop();
        this.active.push(worker);
        return resolve(worker);
      }

      if (this.active.length >= this.poolMax) {
        return this.waiting.push({ resolve, reject });
      }

      worker = fork(this.file);

      worker.once("message", (message) => {
        if (message === "ready") {
          this.active.push(worker);
          return resolve(worker);
        }
        worker.kill();
        reject(new Error("Improper process start"));
      });

      worker.once("exit", (code) => {
        console.log(`Worker exited with code ${code}`);
        this.active = this.active.filter((w) => worker !== w);
        this.pool = this.pool.filter((w) => worker !== w);
      });
    });
  }

  release(worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift();
      return resolve(worker);
    }
    this.active = this.active.filter((w) => worker !== w);
    this.pool.push(worker);
  }
}
