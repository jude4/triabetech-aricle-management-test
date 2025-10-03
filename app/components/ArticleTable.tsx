import { Link, Form } from "@remix-run/react";
import { formatDate } from "~/lib/utils";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  parentId: string | null;
  parent: { title: string } | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ArticleTableProps {
  articles: Article[];
}

export function ArticleTable({ articles }: ArticleTableProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.parent?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-800 border-blue-200",
      Programming: "bg-purple-100 text-purple-800 border-purple-200",
      "Web Development": "bg-green-100 text-green-800 border-green-200",
      Database: "bg-orange-100 text-orange-800 border-orange-200",
      Default: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[category as keyof typeof colors] || colors.Default;
  };

  // Calculate time since last update
  const getTimeSinceUpdate = (date: Date | string | null | undefined) => {
    if (!date) return "Never updated";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "less than a minute ago";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Get status based on article properties
  const getArticleStatus = (article: Article) => {
    if (!article.createdAt) {
      return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }

    const now = new Date();
    const createdDate =
      typeof article.createdAt === "string"
        ? new Date(article.createdAt)
        : article.createdAt;

    // Check if the date is valid
    if (isNaN(createdDate.getTime())) {
      return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }

    const daysSinceCreated = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceCreated < 1)
      return { label: "New", color: "bg-green-100 text-green-800" };
    if (daysSinceCreated < 7)
      return { label: "Recent", color: "bg-blue-100 text-blue-800" };
    return { label: "Published", color: "bg-gray-100 text-gray-800" };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">My Articles</h1>

        {/* Tabs */}
        <div className="mt-4 flex space-x-1">
          {[
            { id: "all", label: "All (Most Recent)" },
            { id: "recent", label: "Recent" },
            { id: "categories", label: "Categories" },
            { id: "drafts", label: "Drafts" },
            { id: "published", label: "Published" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Filter by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by creating your first article."}
            </p>
            <Link to="/articles/new" className="btn btn-primary">
              Create Article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Title</span>
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Updated</span>
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article, index) => {
                  const status = getArticleStatus(article);
                  return (
                    <tr
                      key={article.id}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {article.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {article.content.substring(0, 50)}...
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < 3 ? "bg-blue-500" : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            Last Update: {getTimeSinceUpdate(article.updatedAt)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                            article.parent?.title || "Default"
                          )}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              article.parent?.title === "Technology"
                                ? "bg-blue-500"
                                : article.parent?.title === "Programming"
                                ? "bg-purple-500"
                                : article.parent?.title === "Web Development"
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          />
                          {article.parent?.title || "Uncategorized"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          to={`/articles/${article.id}`}
                          className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md hover:bg-green-200 transition-colors"
                        >
                          Edit Article
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {filteredArticles.length} Records
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Records per page</span>
            <select className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Page 1 of 1</span>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
