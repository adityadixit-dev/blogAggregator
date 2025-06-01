import { getCurrentUser } from "../config";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeedFromUrl } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";
import { checkArgsLenOrThrowError } from "./users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  checkArgsLenOrThrowError(cmdName, 1, ...args);
  const nameOfCurrentUser = getCurrentUser();
  const feedURL = args[0];
  const userObj = await getUserByName(nameOfCurrentUser);
  const feedObj = await getFeedFromUrl(feedURL);
  if (!userObj || !feedObj) {
    throw new Error("Invalid or Null User and/or Invalid Feed");
  }

  const result = await createFeedFollow(userObj, feedObj);

  if (!result) {
    throw new Error("Something went wrong in handlerFollow");
  }

  console.log(`Feed Name: ${result.feeds.name}`);
  console.log(`Current User for this Feed: ${result.users.name}`);
}
