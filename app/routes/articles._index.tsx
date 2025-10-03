import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { ArticleTable } from "~/components/ArticleTable";
import { db } from "~/lib/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const articles = await db.article.findMany({
    include: {
      parent: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ articles });
}

export default function ArticlesIndex() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <ArticleTable articles={articles} />
      </div>
    </Layout>
  );
}
