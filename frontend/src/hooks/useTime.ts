import { useState, useEffect } from 'react';

const getTime = () => new Date();

export const useTime = (refreshCycle = 1000) => {
  // Returns the current time
  // and queues re-renders every `refreshCycle` milliseconds (default: 100ms)

  const [now, setNow] = useState(getTime);

  useEffect(() => {
    // Regularly set time in state
    // (this will cause your component to re-render frequently)
    const intervalId = setInterval(
      () => setNow(getTime),
      refreshCycle,
    );

    // Cleanup interval
    return () => clearInterval(intervalId);

    // Specify dependencies for useEffect
  },        [refreshCycle, setInterval, clearInterval, setNow, getTime]);

  return now;
};