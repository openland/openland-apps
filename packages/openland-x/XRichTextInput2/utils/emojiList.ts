const emojione = require('emojione');

const newEmojiListWithOutPriorityList = (myPriorityList: any) => {
    const list = {};
    for (const key in emojione.emojioneList) {
        if (myPriorityList.hasOwnProperty(key)) {
            continue;
        }

        const uc_output = emojione.emojioneList[key].uc_output;

        list[key] = typeof uc_output === 'string' ? uc_output : uc_output[0];
    }

    return { ...myPriorityList, ...list };
};

export const emojiList: any = {};

emojiList.setPriorityList = (newPriorityList: any) => {
    // re-generate emojiList when set PriorityList
    emojiList.list = newEmojiListWithOutPriorityList(newPriorityList);
};

// init emojiList
const priorityList = {
    ':thumbsup:': '1f44d',
    ':smile:': '1f604',
    ':heart:': '2764-fe0f',
    ':ok_hand:': '1f44c',
    ':joy:': '1f602',
    ':tada:': '1f389',
    ':see_no_evil:': '1f648',
    ':raised_hands:': '1f64c',
    ':100:': '1f4af',
};
emojiList.setPriorityList(priorityList);
