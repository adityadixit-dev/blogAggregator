import { getPostsForUser } from "../lib/db/queries/posts";
import { User } from "../lib/db/schema";

export async function handlerBrowse(cmdName: string, userObj: User, ...args: string[]) {
  let limitOfPosts = 2;

  if (args.length > 1) {
    throw new Error("Invalid number of arguements");
  } else if (args.length === 1) {
    limitOfPosts = Number(args[0]);
  }

  const latestPosts = await getPostsForUser(userObj, limitOfPosts);

  for (const currPost of latestPosts) {
    console.log("--------------------------------");
    console.log(`Title : ${currPost.postTitle}`);
    console.log(`Description: ${currPost.postDescription}`);
    console.log(`Published At: ${currPost.postPublishedAt}`);
    console.log("=====================================");
  }
}
