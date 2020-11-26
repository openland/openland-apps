export const getCounterValue = (count: number) => count > 1000 ? `${Math.floor(count / 1000)}K+` : count;
