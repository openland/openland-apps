export const getMeanAndVar = (
    arr: number[],
): { mean: number; variance: number } => {
    const getVariance = (array: number[], mean: number) => {
        return array.reduce(function(pre: any, cur: any) {
            pre = pre + Math.pow(cur - mean, 2);
            return pre;
        }, 0);
    };

    let meanTot = arr.reduce(function(pre: any, cur: any) {
        return pre + cur;
    });
    let total = getVariance(arr, meanTot / arr.length);

    return {
        mean: meanTot / arr.length,
        variance: total / arr.length,
    };
};

export const median = (numbers: number[]): number => {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    let resMedian = 0;
    let numsLen = numbers.length;
    numbers.sort();

    if (
        numsLen % 2 ===
        0 // is even
    ) {
        // average of two middle numbers
        resMedian = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else {
        // is odd
        // middle number only
        resMedian = numbers[(numsLen - 1) / 2];
    }

    return resMedian;
};

export const range = (numbers: number[]): number[] => {
    numbers.sort((a, b) => {
        return a - b;
    });
    return [numbers[0], numbers[numbers.length - 1]];
};

export const getMeanVarianceMedianAndRange = (numbers: number[]) => {
    const { mean, variance } = getMeanAndVar(numbers);

    return {
        mean,
        variance,
        median: median(numbers),
        range: range(numbers),
        numberOfMeasures: numbers.length,
    };
};
