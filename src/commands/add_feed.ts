import { createFeed } from "../lib/db/queries/feeds";
import { getCurrUserObj, getUserByName, getUserByUUID } from "../lib/db/queries/users";
import { checkArgsLenOrThrowError } from "./users";
import { Feed, User } from "../lib/db/schema";
import { createFeedFollow } from "../lib/db/queries/feed_follows";

export async function handlerAddFeed(
  cmdName: string,
  currUserObj: User,
  ...args: string[]
): Promise<void> {
  checkArgsLenOrThrowError(cmdName, 2, ...args);
  const feedName = args[0];
  const feedUrl = args[1];

  // const currUserObj = await getCurrUserObj();
  // if (!currUserObj) {
  //   throw new Error("User is undefined in handlerAddFeed");
  // }

  const userFeed = await createFeed(feedName, feedUrl);
  if (!userFeed) {
    throw new Error("Unable to create Feed");
  }

  const currFeedFollow = await createFeedFollow(currUserObj, userFeed);

  if (!currFeedFollow) {
    throw new Error("Unable to create feed follow in AddFeed");
  }

  console.log(`User Name: ${currFeedFollow.users.name}`);
  console.log(`Feed Name: ${currFeedFollow.feeds.name}`);
}

// function printFeed(feed: Feed, user: User) {
//   console.log(`* ID:            ${feed.id}`);
//   console.log(`* Created:       ${feed.createdAt}`);
//   console.log(`* Updated:       ${feed.updatedAt}`);
//   console.log(`* name:          ${feed.name}`);
//   console.log(`* URL:           ${feed.url}`);
//   console.log(`* User:          ${user.name}`);
// }
