const NumberOfStepsInOnboarding = 11;

export const getPercentageOfOnboarding = (step: number) => {
    return (step / NumberOfStepsInOnboarding) * 100;
};
