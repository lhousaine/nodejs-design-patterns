import { createServer } from "http";
import {Level} from "level";
import timestamp from "monotonic-timestamp";
import JSONStream from "JSONStream";
import amqp from "amqplib";

async function main() {
  const db = new Level("./msgHistory");

  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange("chat", "fanout");
  const { queue } = channel.assertQueue("chat_history");
  await channel.bindQueue(queue, "chat");

  channel.consume(queue, async (msg) => {
    const content = msg.content.toString();
    console.log(` Saving message: ${content}`);
    await db.put(timestamp(), content);
    channel.ack(msg);
  });
  // (5)
  createServer((req, res) => {
    res.writeHead(200);
    db.values().all().then(values=>res.write(JSONStream.stringify(values)));
  }).listen(8090);
}
main().catch((err) => console.error(err));
