import { and, eq } from "drizzle-orm";
import { db } from "..";
import { Feed, feedFollows, User, feeds, users } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeedFollow(user: User, feed: Feed) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({
      userId: user.id,
      feedId: feed.id,
    })
    .returning();

  const results = await db
    .select()
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return firstOrUndefined(results);
}

export async function getFeedFollowsForUser(user: User) {
  const result = await db
    .select()
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(users.id, user.id));

  return result;
}

export async function deleteFeedFollow(user: User, feed: Feed) {
  const result = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId, user.id), eq(feedFollows.feedId, feed.id)))
    .returning();

  return firstOrUndefined(result);
}
