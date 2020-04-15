export const getRandomInt = (max: number, min?: number) => {
    min = min ? Math.ceil(min) : 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
