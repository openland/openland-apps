import { getDummyElement } from './getDummyElement';

export const convertEmojioneImageToUnicode = (
    html: any,
    { selector, getUnicode }: { selector: any; getUnicode: any },
) => {
    const el = getDummyElement();
    el.innerHTML = html;
    const emojioneEl: any = el.querySelectorAll(selector);
    if (emojioneEl.length === 0) {
        return false;
    }
    [...emojioneEl].forEach((el2: any) => {
        let unicode;
        if ((unicode = getUnicode(el2))) {
            // eslint-disable-line no-cond-assign
            el2.outerHTML = unicode;
        }
    });
    return el.innerHTML;
};
