import * as amqp from "amqplib";
import { createPlayground } from "./lib/create-pod";

interface Playground {
  name: string;
  environment: string;
  port: number;
}

async function startConsumer() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "playground";
    await channel.assertQueue(queue, { durable: true });

    channel.consume(
      queue,
      async (msg) => {
        if (msg) {
          const Playground: Playground = JSON.parse(msg.content.toString());
          await createPlayground(
            Playground.name,
            Playground.environment,
            Playground.port,
          );
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  } catch (error) {
    throw new Error(
      "Error connecting to RabbitMQ or consuming messages:",
      error!,
    );
  }
}

startConsumer();
