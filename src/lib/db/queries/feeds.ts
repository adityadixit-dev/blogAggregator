import { db } from "..";
import { Feed, feeds } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function createFeed(feedName: string, feedUrl: string) {
  const feedIfFeedExists = await getFeedFromUrl(feedUrl);
  if (feedIfFeedExists) {
    return feedIfFeedExists;
  }

  try {
    const [feed] = await db
      .insert(feeds)
      .values({
        name: feedName,
        url: feedUrl,
      })
      .returning();

    return feed;
  } catch (err) {
    console.log("Error creating Feed");
    throw new Error(`${(err as Error).message}`);
  }
}

export async function getAllFeeds() {
  const allFeeds: Feed[] = await db.select().from(feeds);
  return allFeeds;
}

export async function getFeedFromUrl(feedUrl: string) {
  const feedResult = await db.select().from(feeds).where(eq(feeds.url, feedUrl));
  return firstOrUndefined(feedResult);
}
