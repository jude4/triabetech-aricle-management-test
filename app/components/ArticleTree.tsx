import { useState } from "react";
import { Link } from "@remix-run/react";

interface Article {
  id: string;
  title: string;
  slug: string;
  parentId: string | null;
  children: Article[];
}

interface ArticleTreeProps {
  articles: Article[];
  selectedId?: string;
  onSelect?: (article: Article) => void;
}

interface TreeNodeProps {
  article: Article;
  level: number;
  selectedId?: string;
  onSelect?: (article: Article) => void;
}

function TreeNode({ article, level, selectedId, onSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = article.children.length > 0;
  const isSelected = selectedId === article.id;

  const handleClick = () => {
    if (onSelect) {
      onSelect(article);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`
          flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors
          ${
            isSelected
              ? "bg-blue-100 text-blue-900 border-l-2 border-blue-500"
              : "hover:bg-gray-100 text-gray-700"
          }
        `}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="mr-2 p-1 hover:bg-gray-200 rounded"
          >
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
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
        )}
        {!hasChildren && <div className="w-6 mr-2" />}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{article.title}</div>
          <div className="text-xs text-gray-500 truncate">/{article.slug}</div>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {article.children.map((child) => (
            <TreeNode
              key={child.id}
              article={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ArticleTree({
  articles,
  selectedId,
  onSelect,
}: ArticleTreeProps) {
  // Build tree structure from flat array
  const buildTree = (articles: Article[]): Article[] => {
    const articleMap = new Map<string, Article>();
    const rootArticles: Article[] = [];

    // Create a map of all articles
    articles.forEach((article) => {
      articleMap.set(article.id, { ...article, children: [] });
    });

    // Build the tree structure
    articles.forEach((article) => {
      const articleWithChildren = articleMap.get(article.id)!;

      if (article.parentId) {
        const parent = articleMap.get(article.parentId);
        if (parent) {
          parent.children.push(articleWithChildren);
        }
      } else {
        rootArticles.push(articleWithChildren);
      }
    });

    return rootArticles;
  };

  const treeArticles = buildTree(articles);

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Articles</h3>
        <p className="text-sm text-gray-600">Navigate your content</p>
      </div>
      <div className="p-2 max-h-96 overflow-y-auto">
        {treeArticles.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg
                className="mx-auto h-8 w-8"
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
            <p className="text-sm text-gray-500">No articles yet</p>
          </div>
        ) : (
          <div>
            {treeArticles.map((article) => (
              <TreeNode
                key={article.id}
                article={article}
                level={0}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
