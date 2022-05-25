import { createServer } from "http";
import { cpus } from "os";
import cluster from "cluster";

if (cluster.isMaster) {
  // fork()
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(() => cluster.fork());
  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} crashed. ` + "Starting a new worker"
      );
      cluster.fork();
    }
  });
} else {
  // do Work
  const { pid } = process;
  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
  });
  setTimeout(
    () => { throw new Error('Ooops') },
    Math.ceil(Math.random() * 3) * 1000
  )
  server.listen(8080, () => console.log(`Started at ${pid}`));
}
// Each worker is a different Node.js process with its own event loop, memory space, and loaded modules.
