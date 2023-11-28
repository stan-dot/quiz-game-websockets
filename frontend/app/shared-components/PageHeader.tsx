import React from "react";

export function PageHeader({ text }: { text: string }) {
  return (
    <h2 className="text-4xl font-bold">
      {text}
    </h2>
  );
}
