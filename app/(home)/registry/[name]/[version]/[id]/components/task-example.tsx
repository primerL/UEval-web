import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Section } from "./section";

interface TaskExampleProps {
  example: string;
}

export function TaskExample({
  example,
}: TaskExampleProps) {
  if (!example) return null;

  return (
    <Section title="Example">
      <div className="prose prose-sm dark:prose-invert max-w-none font-mono wrap-anywhere">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {example}
        </ReactMarkdown>
      </div>
    </Section>
  );
}
