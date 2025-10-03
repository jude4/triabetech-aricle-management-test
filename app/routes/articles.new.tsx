import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ModernArticleEditor } from "~/components/ModernArticleEditor";
import { db } from "~/lib/db.server";
import { generateSlug } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const parentArticles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return json({ parentArticles });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string;

  if (!title || !slug || !content) {
    return json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  // Check if slug already exists
  const existingArticle = await db.article.findUnique({
    where: { slug },
  });

  if (existingArticle) {
    return json(
      { error: "An article with this slug already exists" },
      { status: 400 }
    );
  }

  const article = await db.article.create({
    data: {
      title,
      slug,
      content,
      parentId: parentId || null,
    },
  });

  return redirect(`/articles/${article.id}`);
}

export default function NewArticle() {
  const { parentArticles } = useLoaderData<typeof loader>();

  return <ModernArticleEditor parentArticles={parentArticles} />;
}
