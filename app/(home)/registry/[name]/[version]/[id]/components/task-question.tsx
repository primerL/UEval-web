import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Section } from "./section";

interface TaskQuestionProps {
  question: string;
}

export function TaskQuestion({
  question,
}: TaskQuestionProps) {
  if (!question) return null;

  return (
    <Section title="Question">
      <div className="prose prose-sm dark:prose-invert max-w-none font-mono wrap-anywhere">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {question}
        </ReactMarkdown>
      </div>
    </Section>
  );
}
