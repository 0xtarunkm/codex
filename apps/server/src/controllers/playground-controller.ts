import { Request, Response } from "express";
import crypto from "crypto";
import { PrismaClient } from "database";
import { sendMessage } from "../utils/producer";

const prisma = new PrismaClient();

export const createPlayground = async (req: Request, res: Response) => {
  try {
    const { title, template } = req.body;

    const decodedUser = req.decodedUser as decodedUser;
    const name = `${title}-${crypto.randomBytes(4).toString("hex")}`;

    let image = "",
      containerPort = 0;
    switch (template) {
      case "nodejs":
        image = "tarunclub/tensor-nodejs-playground-env:1.0.0";
        containerPort = 3000;
        break;
      case "reactjs":
        image = "tarunclub/tensor-react-playground-env:1.0.0";
        containerPort = 5173;
        break;
      default:
        throw new Error(`Invalid template: ${template}`);
    }

    await sendMessage(name, template, containerPort);

    const result = await prisma.playground.create({
      data: {
        title: name,
        template: template,
        containerPort: containerPort,
        containerImage: image,
        user: {
          connect: {
            id: decodedUser.id,
          },
        },
      },
    });

    res.status(201).json({ message: "Project created successfully", result });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getPlaygrounds = async (req: Request, res: Response) => {
  try {
    const decodedUser = req.decodedUser as decodedUser;

    const projects = await prisma.playground.findMany({
      where: {
        userId: decodedUser.id,
      },
    });

    res.status(200).json(projects);
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getPlayground = async (req: Request, res: Response) => {
  try {
    const { playgroundId } = req.params;

    const project = await prisma.playground.findUnique({
      where: {
        id: playgroundId,
      },
    });

    res.status(200).json(project);
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deletePlayground = async (req: Request, res: Response) => {
  try {
    const { playgroundId } = req.params;

    const playground = await prisma.playground.findUnique({
      where: {
        id: playgroundId,
      },
      select: {
        title: true,
      },
    });

    publisher.lpush(
      "delete-playground",
      JSON.stringify({ podName: playground!.title }),
    );

    publisher.hdel("status", playground!.title);

    await prisma.playground.delete({
      where: {
        id: playgroundId,
      },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const closePlayground = async (req: Request, res: Response) => {
  try {
    const { playgroundId } = req.params;

    const playground = await prisma.playground.findUnique({
      where: {
        id: playgroundId,
      },
      select: {
        title: true,
      },
    });

    publisher.lpush(
      "close-playground",
      JSON.stringify({ podName: playground!.title }),
    );

    publisher.hset("status", playground!.title, "closing");

    res.status(200).json({ message: "Project closed successfully" });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const startPlayground = async (req: Request, res: Response) => {
  try {
    const { playgroundId } = req.params;

    const playground = await prisma.playground.findUnique({
      where: {
        id: playgroundId,
      },
      select: {
        title: true,
        containerPort: true,
        containerImage: true,
      },
    });

    publisher.lpush(
      "start-playground",
      JSON.stringify({
        podName: playground!.title,
        containerPort: playground!.containerPort,
        containerImage: playground!.containerImage,
      }),
    );

    publisher.hset("status", playground!.title, "starting");

    res.status(200).json({ message: "Project started successfully" });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const { playgroundName } = req.body;
    const response = await subscriber.hget("status", playgroundName);

    return res.status(200).json({ status: response });
  } catch (error) {
    console.error(error);
  }
};
