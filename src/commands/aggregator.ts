import { scrapeFeeds } from "../lib/db/queries/feeds";
import { checkArgsLenOrThrowError } from "./users";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
  checkArgsLenOrThrowError(cmdName, 1, ...args);
  const timeBetwnReqStr = args[0];
  const timeBetweenRequests = parseDuration(timeBetwnReqStr);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("shutting down aggregator");
      clearInterval(interval);
      resolve();
    });
  });
}

function handleError() {
  return;
}

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) {
    throw new Error("Duration incorrect");
  }
  let timeInMs: number = Number(match[1]);
  const timeType: string = match[2];

  if (timeType === "s") {
    timeInMs *= 1000;
  } else if (timeType === "m") {
    timeInMs *= 1000 * 60;
  } else if (timeType === "h") {
    timeInMs *= 1000 * 60 * 60;
  }

  return timeInMs;
}
