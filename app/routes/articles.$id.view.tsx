import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { MarkdownPreview } from "~/components/MarkdownPreview";
import { formatDate } from "~/lib/utils";
import { db } from "~/lib/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const articleId = params.id;

  if (!articleId) {
    throw new Response("Article ID is required", { status: 400 });
  }

  const article = await db.article.findUnique({
    where: { id: articleId },
    include: {
      parent: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  return json({ article });
}

export default function ViewArticle() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <a href="/articles" className="hover:text-gray-900">
              Articles
            </a>
            {article.parent && (
              <>
                <span>/</span>
                <a
                  href={`/articles/${article.parent.slug}`}
                  className="hover:text-gray-900"
                >
                  {article.parent.title}
                </a>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span>Created: {formatDate(article.createdAt)}</span>
            <span>Updated: {formatDate(article.updatedAt)}</span>
            {article.parent && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.parent.title}
              </span>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <MarkdownPreview content={article.content} />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <a href={`/articles/${article.id}`} className="btn btn-primary">
            Edit Article
          </a>
        </div>
      </div>
    </Layout>
  );
}
