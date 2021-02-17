export const getCounterValue = (count: number, cutoff: number = 1000) => count > cutoff ? `${Math.floor(count / 1000)}K+` : count;
