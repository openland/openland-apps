import * as React from 'react';
import { NimblePicker, EmojiData } from 'emoji-mart';
import data from 'emoji-mart/data/emojione.json';
import { css } from 'linaria';
import useOnClickOutside from 'use-onclickoutside';
import EmojiIcon from 'openland-icons/ic-emoji.svg';
import { XPopper } from 'openland-x/XPopper';

const emojiWrapperClassName = css`
    width: 18px;
    height: 18px;
    & * {
        cursor: pointer;
        width: 18px;
        height: 18px;
        fill: rgba(0, 0, 0, 0.25);
    }
    &:hover * {
        fill: #1790ff;
    }
`;

const pickerClassName = css`
    position: absolute;
    bottom: 50px;
    right: 0;
    margin-top: 10px;
    padding: 0 0.3em;
    z-index: 1;
    box-sizing: content-box;
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 30px 0 gainsboro;
    & .emoji-mart-search {
        display: block;
    }
`;

type EmojiButtonT = { onEmojiPicked: (emoji: EmojiData) => void };

export const EmojiButton = ({ onEmojiPicked }: EmojiButtonT) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const ref = React.useRef(null);
    useOnClickOutside(ref, () => {
        setShowPicker(false);
    });

    return (
        <XPopper
            show={showPicker}
            placement="top"
            content={
                <NimblePicker
                    showPreview
                    emojiTooltip
                    data={data}
                    color="#1790ff"
                    set="emojione"
                    onSelect={onEmojiPicked}
                />
            }
        >
            <div
                ref={ref}
                className={emojiWrapperClassName}
                onClick={() => {
                    setShowPicker(!showPicker);
                }}
            >
                <EmojiIcon />
            </div>
        </XPopper>
    );
};
