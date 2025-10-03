import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/lib/db.server";

export async function action({ params }: ActionFunctionArgs) {
  const articleId = params.id;

  if (!articleId) {
    throw new Response("Article ID is required", { status: 400 });
  }

  // Check if article exists
  const article = await db.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  // Check if article has children
  const children = await db.article.findMany({
    where: { parentId: articleId },
  });

  if (children.length > 0) {
    throw new Response(
      "Cannot delete article with child articles. Please delete child articles first.",
      { status: 400 }
    );
  }

  // Delete the article
  await db.article.delete({
    where: { id: articleId },
  });

  return redirect("/articles");
}
