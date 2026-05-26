import { useState, useEffect, useCallback } from 'react';

/**
 * Toast — listens for the global 'toast:show' custom event and renders a
 * self-dismissing notification in the bottom-right corner.
 *
 * Event detail shape: { message: string, type?: 'error' | 'info' | 'success' }
 */
export default function Toast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ detail }) => {
    const id = Date.now();
    const type = detail?.type ?? 'error';
    const message = detail?.message ?? '';

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  useEffect(() => {
    window.addEventListener('toast:show', addToast);
    return () => window.removeEventListener('toast:show', addToast);
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-center gap-3
            px-4 py-3 rounded-xl shadow-xl
            text-sm font-medium text-white
            animate-slide-in
            ${toast.type === 'error' ? 'bg-red-600' : ''}
            ${toast.type === 'success' ? 'bg-emerald-600' : ''}
            ${toast.type === 'info' ? 'bg-indigo-600' : ''}
          `}
          role="alert"
          aria-live="assertive"
        >
          {/* Icon */}
          {toast.type === 'error' && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          )}
          {toast.type === 'success' && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          )}
          {toast.type === 'info' && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
