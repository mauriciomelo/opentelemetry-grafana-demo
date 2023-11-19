import express, { Request, Response, Application } from "express";
import { logger } from "./logger";
import cors from "cors";

const app: Application = express();
const port = parseInt(process.env.PORT || "3002");

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.get("/rolldice", (req, res) => {
  const value = getRandomNumber(1, 6).toString();
  logger.info({ message: "rolldice", value });

  res.send(value);
});

app.get("/pets", async (req: Request, res: Response) => {
  logger.warn("Hardcoded List of pets");
  await sleep(getRandomNumber(200, 500));
  res.json({
    data: [
      { name: "Maia" },
      { name: "Pupa" },
      { name: "Papa" },
      { name: "Pupu" },
    ],
  });
});

app.listen(port, () => {
  console.log(`Petstore API server is running at http://localhost:${port}`);
});

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
