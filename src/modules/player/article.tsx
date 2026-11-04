// Lesson bodies are a few text blocks, not HTML. A `## ` line is a heading.
// A leading heading that repeats the page title is omitted because the h1
// already says it.
export function ArticleBody({ body, title }: { body: string; title: string }) {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
  const visible = blocks[0] === `## ${title}` ? blocks.slice(1) : blocks;

  return (
    <div className="mt-6 flex max-w-3xl flex-col gap-4">
      {visible.map((block, index) => {
        if (block.startsWith("## ")) {
          const heading = block.slice(3).trim();
          if (!heading) return null;

          return (
            <h2 key={index} className="text-2xl font-semibold tracking-tight">
              {heading}
            </h2>
          );
        }

        return (
          <p key={index} className="whitespace-pre-line text-lg">
            {block}
          </p>
        );
      })}
    </div>
  );
}
