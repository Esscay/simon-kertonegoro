import React from "react";

/**
 * Renders a recommendation quote: paragraphs split on \n\n and **bold**
 * spans rendered as <strong>. Server-safe (no hooks).
 */
export default function QuoteText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, pi) => (
        <span key={pi} className={pi > 0 ? "mt-3 block" : "block"}>
          {para.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          )}
        </span>
      ))}
    </>
  );
}

/** Plain-text version (markers stripped) for clamped previews + llms.txt */
export const plainQuote = (text: string) => text.replace(/\*\*/g, "");
