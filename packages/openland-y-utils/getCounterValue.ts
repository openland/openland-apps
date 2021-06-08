export const getCounterValue = ({
    count,
    suffix = 'K',
    cutoff = 1000,
}: {
    count: number,
    suffix?: string,
    cutoff?: number,
}) => count > cutoff ? `${Math.floor(count / 1000)}${suffix}+` : count;
