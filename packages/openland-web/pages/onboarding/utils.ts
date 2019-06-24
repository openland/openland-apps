const NumberOfStepsInOnboarding = 10;

export const getPercentageOfOnboarding = (step: number) => {
    return (step / NumberOfStepsInOnboarding) * 100;
};
