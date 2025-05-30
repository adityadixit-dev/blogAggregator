import { db } from "..";
import { Feed, feeds } from "../schema";

export async function createFeed(userUUID: string, feedName: string, feedUrl: string) {
  try {
    const [feed] = await db
      .insert(feeds)
      .values({
        name: feedName,
        url: feedUrl,
        user_id: userUUID,
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
