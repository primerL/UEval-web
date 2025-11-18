import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default async function Registry() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 sm:pt-12">
      <div className="flex w-full max-w-7xl flex-1 flex-col">
        <h2 className="mb-6 font-mono text-4xl tracking-tighter">
          Dataset Registry
        </h2>
        <CodeBlock
          lang="bash"
          code={`# FrontierCS dataset available`}
          className="mt-0 mb-6 font-mono"
        />
        <p className="text-muted-foreground font-mono">
          View{" "}
          <Link href="/registry/FrontierCS/1.0" className="underline underline-offset-4">
            FrontierCS 1.0
          </Link>
          {" "}dataset.
        </p>
      </div>
    </div>
  );
}
