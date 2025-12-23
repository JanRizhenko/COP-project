import { useMemo } from 'react';

export const useResultsPage = (moves, minMoves, time) => {
  const efficiency = useMemo(() => {
    if (moves === 0) return 0;
    return Math.round((minMoves / moves) * 100);
  }, [moves, minMoves]);

  const isOptimal = useMemo(() => {
    return moves === minMoves;
  }, [moves, minMoves]);

  const performanceRating = useMemo(() => {
    if (isOptimal) return { text: 'Perfect!', color: '#f1c40f' };
    if (efficiency >= 90) return { text: 'Excellent!', color: '#4CAF50' };
    if (efficiency >= 75) return { text: 'Good!', color: '#2196F3' };
    if (efficiency >= 60) return { text: 'Not Bad!', color: '#ff9800' };
    return { text: 'Can Do Better!', color: '#f44336' };
  }, [efficiency, isOptimal]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins} min ${secs} sec`;
  }, [time]);

  return {
    efficiency,
    isOptimal,
    performanceRating,
    formattedTime
  };
};
