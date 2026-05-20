export default function Badge({ label, variant = 'gray' }) {
  if (!label) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-400 border-gray-100 inline-flex items-center justify-center whitespace-nowrap">
        N/A
      </span>
    );
  }

  const variants = {
    gray: 'bg-gray-50 text-gray-700 border-gray-200/60 shadow-sm',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60 shadow-sm',
    green: 'bg-green-50 text-green-700 border-green-200/60 shadow-sm',
    red: 'bg-red-50 text-red-700 border-red-200/60 shadow-sm',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200/60 shadow-sm',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/60 shadow-sm',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60 shadow-sm',
    pink: 'bg-pink-50 text-pink-700 border-pink-200/60 shadow-sm',
    orange: 'bg-orange-50 text-orange-700 border-orange-200/60 shadow-sm',
  };

  const style = variants[variant] || variants.gray;

  // Capitalize first letter or keep as is, depending on use case. We can just render label.
  const displayLabel = typeof label === 'string' ? label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ') : label;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} inline-flex items-center justify-center whitespace-nowrap`}>
      {displayLabel}
    </span>
  );
}
