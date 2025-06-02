import { getAllFeeds } from "../lib/db/queries/feeds";
import { getNameFromUUID } from "../lib/db/queries/users";

export async function handlerFeeds(_: string): Promise<void> {
  const allFeeds = await getAllFeeds();
  if (allFeeds.length === 0) {
    console.log("No feeds found");
    return;
  }

  for (const oneFeed of allFeeds) {
    if (!oneFeed) {
      continue;
    }
    console.log(`Name: ${oneFeed.name} -  URL: ${oneFeed.url}`);
  }
}
