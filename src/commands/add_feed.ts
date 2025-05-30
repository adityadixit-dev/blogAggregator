import { getCurrentUser } from "../config";
import { createFeed } from "../lib/db/queries/feeds";
import { getUserByUUID } from "../lib/db/queries/users";
import { checkArgsLenOrThrowError } from "./users";
import { Feed, User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
  checkArgsLenOrThrowError(cmdName, 2, ...args);
  const feedName = args[0];
  const feedUrl = args[1];
  const currentUser = getCurrentUser();
  if (currentUser === "") {
    throw new Error("User Not set");
  }

  const userUUID = await getUserByUUID(currentUser);

  const userFeed = await createFeed(userUUID, feedName, feedUrl);
  if (!userFeed) {
    throw new Error("Unable to create Feed");
  }

  printFeed(userFeed);
}

function printFeed(feed: Feed) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  // console.log(`* User:          ${user.name}`);
}
