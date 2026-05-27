/**
 * Formats a timestamp string into a human-readable date and time string
 * using the user's local timezone automatically.
 *
 * @param {string|null|undefined} timestamp - An ISO 8601 timestamp string.
 * @returns {string} A formatted date/time string, or '—' if the input is falsy.
 */
export function formatDate(timestamp) {
  if (!timestamp) return '—';
  return new Date(timestamp).toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
