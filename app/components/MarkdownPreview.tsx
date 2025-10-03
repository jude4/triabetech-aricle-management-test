interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  // Simple markdown to HTML conversion for basic formatting
  const formatMarkdown = (text: string) => {
    return (
      text
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>'
        )
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
        // Code blocks
        .replace(
          /```([\s\S]*?)```/gim,
          '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4"><code class="text-sm">$1</code></pre>'
        )
        // Inline code
        .replace(
          /`([^`]*)`/gim,
          '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
        )
        // Links
        .replace(
          /\[([^\]]*)\]\(([^)]*)\)/gim,
          '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
        )
        // Line breaks
        .replace(/\n/gim, "<br>")
    );
  };

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  );
}
