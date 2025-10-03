import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { MarkdownPreview } from "./MarkdownPreview";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  parentId: string | null;
}

interface ArticleEditorProps {
  article?: Article;
  parentArticles: Array<{ id: string; title: string; slug: string }>;
  isEditing?: boolean;
}

export function ArticleEditor({
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

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          {isEditing ? "Edit Article" : "Create New Article"}
        </h2>
        <p className="text-sm text-gray-600">
          {isEditing
            ? "Update your article content"
            : "Create a new article or category"}
        </p>
      </div>
      <div className="card-content">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Enter article title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={slug}
              className="input"
              placeholder="article-slug"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the title (auto-generated)
            </p>
          </div>

          <div>
            <label
              htmlFor="parentId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Parent Category
            </label>
            <select
              id="parentId"
              name="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="input"
            >
              <option value="">No parent (Root level)</option>
              {parentArticles.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select a parent category to create a hierarchical structure
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content *
              </label>
              <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === "edit"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === "preview"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {activeTab === "edit" ? (
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="textarea"
                placeholder="Write your article content here... (Markdown supported)"
                required
              />
            ) : (
              <div className="border border-gray-300 rounded-md p-4 min-h-[300px] bg-white">
                {content ? (
                  <MarkdownPreview content={content} />
                ) : (
                  <p className="text-gray-500 italic">No content to preview</p>
                )}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-1">
              You can use Markdown formatting for rich text content
            </p>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Article"
                : "Create Article"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
