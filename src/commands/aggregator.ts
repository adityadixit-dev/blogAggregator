import { fetchFeed } from "../lib/rss";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
  const feedURL = "https://www.wagslane.dev/index.xml";
  const rssFeed = await fetchFeed(feedURL);
  const rssFeedStr = JSON.stringify(rssFeed, null, 2);
  console.log(rssFeedStr);
}
