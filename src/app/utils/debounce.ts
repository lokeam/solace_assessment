/**
 * Debounce function - delays execution until after a designated delay in milliseconds has passed
 * since the last time it was invoked. Prevents spamming API search inputs.
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delayInMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delayInMs);
  };
}