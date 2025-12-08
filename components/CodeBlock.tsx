import { MdCheck, MdContentCopy } from "react-icons/md";

export function CodeBlock({
  value,
  copied,
  onCopy,
}: {
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="relative overflow-x-auto rounded-xl bg-gray-900 p-4 font-mono text-sm text-gray-300">
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2 right-2 flex items-center gap-2 rounded-md bg-gray-700/50 px-3 py-1.5 text-xs text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
        aria-live="polite"
      >
        {copied ? <MdCheck /> : <MdContentCopy />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>

      <pre>
        <code>{value}</code>
      </pre>
    </div>
  );
}