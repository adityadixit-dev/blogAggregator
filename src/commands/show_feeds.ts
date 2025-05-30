import { getAllFeeds } from "../lib/db/queries/feeds";
import { getNameFromUUID } from "../lib/db/queries/users";

export async function handlerFeeds(_: string): Promise<void> {
  const allFeeds = await getAllFeeds();
  if (allFeeds.length === 0) {
    console.log("No feeds found");
    return;
  }

  for (const oneFeed of allFeeds) {
    const userName = await getNameFromUUID(oneFeed.user_id);
    console.log();
    console.log(`${oneFeed.name} - ${userName}`);
    console.log(`URL - ${oneFeed.url}`);
    console.log();
  }
}
