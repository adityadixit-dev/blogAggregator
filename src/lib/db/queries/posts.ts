import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, Post, posts, User, users } from "../schema";
import { getFeedFollowsForUser } from "./feed_follows";
import { getCurrUserObj } from "./users";
import { firstOrUndefined } from "./utils";

export async function createPost(
  postTitle: string,
  postUrl: string,
  feedId: string,
  postDesc?: string,
  postPublishedAt?: string,
) {
  try {
    const result = await db
      .insert(posts)
      .values({
        title: postTitle,
        url: postUrl,
        feedId: feedId,
        description: postDesc,
        publishedAt: postPublishedAt,
      })
      .returning();
    return firstOrUndefined(result);
  } catch (err) {
    console.log(`Error creating post:${(err as Error).message}`);
  }
}

export async function getPostsForUser(currentUser: User, numberOfPosts: number) {
  //try to do this using just sql
  const result = await db
    .select({
      postTitle: posts.title,
      postUrl: posts.url,
      postDescription: posts.description,
      postPublishedAt: posts.publishedAt,
    })
    .from(users)
    .innerJoin(feedFollows, eq(feedFollows.userId, users.id))
    .innerJoin(posts, eq(feedFollows.feedId, posts.feedId))
    .where(eq(users.id, currentUser.id))
    .orderBy(desc(posts.publishedAt))
    .limit(numberOfPosts);

  return result;
}
