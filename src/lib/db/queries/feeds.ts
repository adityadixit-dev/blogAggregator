import { db } from "..";
import { Feed, feeds } from "../schema";
import { eq, sql } from "drizzle-orm";
import { firstOrUndefined } from "./utils";
import { fetchFeed } from "../../rss";

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

export async function markFeedFetched(feed: Feed) {
  const result = await db
    .update(feeds)
    .set({
      updatedAt: sql`NOW()`,
      lastFetchedAt: sql`NOW()`,
    })
    .where(eq(feeds.id, feed.id))
    .returning();
  return firstOrUndefined(result);
}

export async function getNextFeedToFetch() {
  const result = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`);

  return result;
}

export async function scrapeFeeds() {
  const listOfFeeds = await getNextFeedToFetch();
  if (!listOfFeeds) {
    throw new Error("No Feeds to fetch");
  }

  for (const nextFeed of listOfFeeds) {
    await markFeedFetched(nextFeed);
    const rssFeed = await fetchFeed(nextFeed.url);
    console.log("-----------------------------------");
    console.log(`Getting Data from Feed: ${rssFeed.channel.title}`);
    console.log();
    for (const item of rssFeed.channel.item) {
      console.log(item.title);
    }
    console.log(`----End of Data from : ${rssFeed.channel.title}`);
    console.log("============================================");
  }
}
