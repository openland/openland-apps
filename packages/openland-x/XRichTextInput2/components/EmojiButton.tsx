import * as React from 'react';
import { NimblePicker, EmojiData } from 'emoji-mart';
import data from 'emoji-mart/data/emojione.json';
import { css } from 'linaria';
import useOnClickOutside from 'use-onclickoutside';
import EmojiIcon from 'openland-icons/ic-emoji.svg';
import { XPolitePopper } from 'openland-x/XPolitePopper';

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

const nimblePickerClassName = css`
    .emoji-mart-search {
        display: block !important;
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
        <>
            <XPolitePopper
                show={showPicker}
                onClickOutside={() => {
                    setShowPicker(false);
                }}
                arrow={null}
                placement="top"
                content={
                    <div className={nimblePickerClassName}>
                        <NimblePicker
                            showSkinTones
                            showPreview
                            emojiTooltip
                            data={data}
                            color="#1790ff"
                            set="emojione"
                            onSelect={onEmojiPicked}
                        />
                    </div>
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
            </XPolitePopper>
        </>
    );
};
