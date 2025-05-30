import { db } from "..";
import { feeds } from "../schema";

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
