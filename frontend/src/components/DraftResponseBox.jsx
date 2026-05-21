import { Copy, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function DraftResponseBox({ draftResponse }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (draftResponse) {
      navigator.clipboard.writeText(draftResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!draftResponse) {
    return null;
  }

  return (
    <div className="bg-indigo-50/50 rounded-xl border border-indigo-100/50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-indigo-700 font-semibold">
          <Sparkles className="w-5 h-5" />
          <span>AI Draft Response</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Response</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-white rounded-xl p-5 border border-indigo-100/50 shadow-sm text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
        {draftResponse}
      </div>
    </div>
  );
}
