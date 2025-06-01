import { getCurrentUser } from "../config";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollowing(_: string, currUserObj: User) {
  // const currUserObj = await getUserByName(getCurrentUser());
  // if (!currUserObj) {
  //   throw new Error("Unable to get user in handlerFollowing");
  // }

  const userFollowing = await getFeedFollowsForUser(currUserObj);
  for (const currFeedFollow of userFollowing) {
    console.log(`Feed Name: ${currFeedFollow.feeds.name}`);
  }
}
