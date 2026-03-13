/**
 * Utility functions for formatting data.
 */

export const formatBPM = (bpm: number | null): string => {
  return bpm ? `${bpm} BPM` : '-- BPM';
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};
