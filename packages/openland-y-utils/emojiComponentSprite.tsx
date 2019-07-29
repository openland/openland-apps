import * as React from 'react';
import toolkit from 'emoji-toolkit';
const emojiList = (toolkit as any).emojiList;

export function emojiComponentSprite(codepoint: string, key?: string) {
    // name.split('-').

    let sn = (toolkit as any).toShort(codepoint);
    if (!sn) {
        return null;
    }
    if (!emojiList[sn]) {
        return null;
    }
    let fname = emojiList[sn].uc_base;
    const category = (fname.indexOf("-1f3f") >= 0) ? 'diversity' : emojiList[sn].category;

    // return (
    //     <img
    //         className={emojiStyle}
    //         src={emojiLinkLowRes(name)}
    //         key={key}
    //     />
    // );

    return <span className={`joypixels joypixels-32-${category} _${fname}`}>{}</span>;
}