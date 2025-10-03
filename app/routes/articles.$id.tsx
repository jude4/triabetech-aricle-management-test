import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { ModernArticleEditor } from "~/components/ModernArticleEditor";
import { db } from "~/lib/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const articleId = params.id;

  if (!articleId) {
    throw new Response("Article ID is required", { status: 400 });
  }

  const [article, allArticles, parentArticles] = await Promise.all([
    db.article.findUnique({
      where: { id: articleId },
    }),
    db.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        parentId: true,
      },
      orderBy: {
        title: "asc",
      },
    }),
    db.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        title: "asc",
      },
    }),
  ]);

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  return json({ article, allArticles, parentArticles });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const articleId = params.id;
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string;

  if (!articleId) {
    throw new Response("Article ID is required", { status: 400 });
  }

  if (!title || !slug || !content) {
    return json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  // Check if slug already exists (excluding current article)
  const existingArticle = await db.article.findFirst({
    where: {
      slug,
      id: { not: articleId },
    },
  });

  if (existingArticle) {
    return json(
      { error: "An article with this slug already exists" },
      { status: 400 }
    );
  }

  const article = await db.article.update({
    where: { id: articleId },
    data: {
      title,
      slug,
      content,
      parentId: parentId || null,
    },
  });

  return redirect(`/articles/${article.id}`);
}

export default function EditArticle() {
  const { article, parentArticles } = useLoaderData<typeof loader>();

  return (
    <ModernArticleEditor
      article={article}
      parentArticles={parentArticles}
      isEditing={true}
    />
  );
}
