import { deleteFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeedFromUrl } from "../lib/db/queries/feeds";
import { User } from "../lib/db/schema";
import { checkArgsLenOrThrowError } from "./users";

export async function handlerUnfollow(cmdName: string, userObj: User, ...args: string[]) {
  checkArgsLenOrThrowError(cmdName, 1, ...args);
  const feedUrl = args[0];
  const feedObj = await getFeedFromUrl(feedUrl);

  if (!feedObj) {
    throw new Error("Feed Not found");
  }

  const result = await deleteFeedFollow(userObj, feedObj);
  if (!result) {
    throw new Error("Unable to delete Feed Follow");
  }
  console.log(`Feed ${feedObj.name} followed by user ${userObj.name} removed `);
}
