import { nanoid } from "nanoid";

export function createRequestChannel(channel) {
  const correlationMap = new Map(); // (1)

  function sendRequest(data) {
    console.log("Sending request", data);

    return new Promise((resolve, reject) => {
      const correlationId = nanoid(); // (2)
      
      const replyTimeout = setTimeout(() => {
        correlationMap.delete(correlationId);
        reject(new Error("Request timeout"));
      }, 10000);

      correlationMap.set(correlationId, (replyData) => {
        correlationMap.delete(correlationId);
        clearTimeout(replyTimeout);
        resolve(replyData);
      });

      channel.send({
        type: "request",
        data,
        id: correlationId,
      });
    });
  }

  channel.on("message", (message) => {
    const callback = correlationMap.get(message.inReplyTo);
    if (callback) {
      callback(message.data);
    }
  });

  // (3)
  return sendRequest;
}
