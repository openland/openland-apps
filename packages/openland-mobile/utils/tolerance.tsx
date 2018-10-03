
const emoji1 = ['🤷🏻‍', '🤷‍', '️🤷🏼‍', '️🤷🏽‍', '️🤷🏾‍'];
const emoji2 = ['', '♂'];
export const randomEmptyPlaceholderEmoji = () => {
    return emoji1[new Date().getTime() % emoji1.length] + emoji2[new Date().getTime() % emoji2.length];
};
