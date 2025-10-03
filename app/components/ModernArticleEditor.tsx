import { Form, useNavigation, Link } from "@remix-run/react";
import { useState } from "react";
import { MarkdownPreview } from "./MarkdownPreview";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  parentId: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface ArticleEditorProps {
  article?: Article;
  parentArticles: Array<{ id: string; title: string; slug: string }>;
  isEditing?: boolean;
}

export function ModernArticleEditor({
  article,
  parentArticles,
  isEditing = false,
}: ArticleEditorProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [parentId, setParentId] = useState(article?.parentId || "");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const slug = generateSlug(title);

  // Available tags for categorization
  const availableTags = [
    "Technology",
    "Programming",
    "Web Development",
    "Database",
    "Design",
    "Tutorial",
    "News",
    "Review",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getTagColor = (tag: string) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-800 border-blue-200",
      Programming: "bg-purple-100 text-purple-800 border-purple-200",
      "Web Development": "bg-green-100 text-green-800 border-green-200",
      Database: "bg-orange-100 text-orange-800 border-orange-200",
      Design: "bg-pink-100 text-pink-800 border-pink-200",
      Tutorial: "bg-yellow-100 text-yellow-800 border-yellow-200",
      News: "bg-red-100 text-red-800 border-red-200",
      Review: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return (
      colors[tag as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/articles"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Articles</span>
            </Link>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
            {isEditing ? (
              <>
                <span className="text-gray-700 font-medium truncate max-w-xs">
                  {article?.title}
                </span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-blue-600 font-semibold">Edit</span>
              </>
            ) : (
              <span className="text-blue-600 font-semibold">New Article</span>
            )}
          </nav>
        </div>
      </div>

      <div className="flex">
        {/* Enhanced Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200 min-h-screen shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Content Management
              </h3>
            </div>

            <div className="space-y-3">
              {/* Navigation Items */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white hover:shadow-md cursor-pointer transition-all duration-200 group">
                  <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    Article Settings
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white hover:shadow-md cursor-pointer transition-all duration-200 group">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    Content
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white shadow-md cursor-pointer border-2 border-yellow-200">
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-yellow-800">
                    Article Editor
                  </span>
                </div>
              </div>

              {/* Enhanced Categories Section */}
              <div className="mt-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Categories
                  </h4>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {parentArticles.map((parent, index) => (
                    <div
                      key={parent.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer transition-all duration-200 group"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index % 4 === 0
                            ? "bg-blue-500"
                            : index % 4 === 1
                            ? "bg-green-500"
                            : index % 4 === 2
                            ? "bg-purple-500"
                            : "bg-orange-500"
                        } group-hover:scale-125 transition-transform duration-200`}
                      ></div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors">
                        {parent.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Area */}
        <div className="flex-1 bg-white">
          <div className="p-8">
            {/* Enhanced Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {isEditing ? "Edit Article" : "Create New Article"}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {isEditing
                        ? `Last edited on ${new Date().toLocaleDateString()} by Current User`
                        : "Create and organize your content with our modern editor"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Form method="post" className="space-y-8">
              {/* Enhanced Article Categories */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">
                    Article Categories
                  </label>
                </div>
                <div className="flex flex-wrap gap-3">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 transform hover:scale-105 ${
                        selectedTags.includes(tag)
                          ? `${getTagColor(tag)} shadow-md scale-105`
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                      }`}
                    >
                      {selectedTags.includes(tag) && (
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Created */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <label className="text-sm font-bold text-gray-800">
                      Date Created
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      className="input w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Author */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <label className="text-sm font-bold text-gray-800">
                      Author
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      className="input w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter author name"
                      defaultValue="Current User"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Title and Slug Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">
                    Article Details
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter article title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={slug}
                      className="input w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200"
                      placeholder="article-slug"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        URL-friendly version of the title (auto-generated)
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent Category
                    </label>
                    <select
                      name="parentId"
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                      className="input w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="">No parent (Root level)</option>
                      {parentArticles.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Enhanced Content Editor */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <label className="text-sm font-bold text-gray-800">
                      Article Content *
                    </label>
                  </div>

                  {/* Enhanced Rich Text Editor Toolbar */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                    >
                      H2
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button
                      type="button"
                      className="p-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                    >
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
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                    >
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
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                    >
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
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Enhanced Content Editor */}
                <div className="flex">
                  <div className="flex-1">
                    <div className="flex border-b border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => setActiveTab("edit")}
                        className={`px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                          activeTab === "edit"
                            ? "bg-white text-blue-600 border-b-2 border-blue-500 shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span>Edit</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                          activeTab === "preview"
                            ? "bg-white text-blue-600 border-b-2 border-blue-500 shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>Preview</span>
                        </div>
                      </button>
                    </div>

                    {activeTab === "edit" ? (
                      <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        className="w-full p-6 border-0 focus:ring-0 resize-none bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Write your article content here... (Markdown supported)"
                        required
                      />
                    ) : (
                      <div className="p-6 min-h-[300px] bg-white">
                        {content ? (
                          <MarkdownPreview content={content} />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <svg
                              className="w-12 h-12 mb-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <p className="text-lg font-medium">
                              No content to preview
                            </p>
                            <p className="text-sm">
                              Start writing to see your content here
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Attachments */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">
                    Attachments
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>All changes are saved automatically</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="w-4 h-4 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>
                              {isEditing ? "Update Article" : "Create Article"}
                            </span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
