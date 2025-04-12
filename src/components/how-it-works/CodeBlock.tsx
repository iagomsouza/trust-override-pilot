
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  // Add FraudGuard AI comment to the code example if it doesn't have one
  const processedCode = code.includes('FraudGuard AI') 
    ? code 
    : `// FraudGuard AI Fraud Detection API Example\n${code}`;
    
  // Trim leading whitespace while preserving indentation structure
  const trimmedCode = processedCode
    .split('\n')
    .map(line => line.trimStart())
    .join('\n')
    .trim();

  return (
    <div className="rounded-md bg-gray-900 overflow-hidden">
      <pre className="p-4 text-sm text-gray-200 font-mono overflow-x-auto">
        <code>{trimmedCode}</code>
      </pre>
    </div>
  );
};
