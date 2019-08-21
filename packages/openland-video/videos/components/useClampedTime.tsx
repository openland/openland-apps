import { useTime } from './useTime';

export function useClampedTime(start: number, end: number) {
    let time = useTime();
    if (time < start) {
        return 0;
    }
    if (time > end) {
        return 1;
    }
    return (time - start) / (end - start);
}