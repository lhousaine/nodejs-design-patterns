import Redis from "ioredis";
import { processTask } from "./processTask.js";

const redisClient = new Redis();
const [, , consumerName] = process.argv;

async function main() {
  await redisClient
    .xgroup(
      "CREATE",
      "tasks_stream", // stream to be consumed name
      "workers_group",// the consume group name
      "$", // the group should start consuming from the record ID( $ last record in the stream).
      "MKSTREAM" // create stream if not exist
    )
    .catch(() => console.log("Consumer group already exists"));

  const [[, records]] = await redisClient.xreadgroup(
    "GROUP",
    "workers_group", 
    consumerName,
    "STREAMS",
    "tasks_stream", 
    "0" // we want to read all pending messages belonging to the current consumer starting from the first message.
  );// read all the records belonging to the current consumer.

  for (const [recordId, [, rawTask]] of records) {
    await processAndAck(recordId, rawTask);
  }

  while (true) {
    // we want to start reading new records from the stream (and not access the consumer's own history).
    const [[, records]] = await redisClient.xreadgroup(
      "GROUP",
      "workers_group",
      consumerName,
      "BLOCK", // block if there are no new records currently available 
      "0", // wait indefinitly
      "COUNT", // one call
      "1",// one record 
      "STREAMS",
      "tasks_stream", // read from the stream
      ">" // records not yet readed by the consumer
    );
    for (const [recordId, [, rawTask]] of records) {
      await processAndAck(recordId, rawTask);
    }
  }

}

async function processAndAck(recordId, rawTask) {
  const found = processTask(JSON.parse(rawTask));
  if (found) {
    console.log(`Found! => ${found}`);
    await redisClient.xadd("results_stream", "*", "result", `Found: ${found}`);
  }
  // (4)
  await redisClient.xack("tasks_stream", "workers_group", recordId);
}

main().catch((err) => console.error(err));
