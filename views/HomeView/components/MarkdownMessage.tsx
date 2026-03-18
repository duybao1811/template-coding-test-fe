'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

type Props = {
  content: string;
};

const MarkdownMessage = ({ content }: Props) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 text-sm text-text-primary">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-5 text-xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-4 text-lg font-semibold">{children}</h3>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 list-disc pl-5 text-sm">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal pl-5 text-sm">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mb-3 border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-3 py-2 align-top">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {children}
            </a>
          ),
          code(props) {
            const { inline, className, children, ...rest } = props as {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            };

            const match = /language-(\w+)/.exec(className || '');
            const language = match?.[1];

            if (inline) {
              return (
                <code
                  className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="mb-4 overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 text-xs text-gray-500">
                  <span>{language || 'code'}</span>
                </div>
                <pre className="overflow-x-auto bg-white p-4 text-sm">
                  <code className={className} {...rest}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;