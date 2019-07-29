import * as React from 'react';
import { css, cx } from 'linaria';
import IconSticker from './ic_sticker.svg';
import { usePopper } from '../usePopper';

const emojiPickerIcon = css`
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 10px;
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: opacity 150ms cubic-bezier(.29, .09, .24, .99);

    &:hover {
        opacity: 0.5;
    }
`;

const emojiPickerIconOpen = css`
    opacity: 0.5;
`;

export const EmojiPicker = React.memo(() => {
    const [visible, show] = usePopper({
        placement: 'top-end',
        hideOnLeave: true
    }, () => <div>Hello!?</div>);

    return (
        <>
            <div
                className={cx(emojiPickerIcon, visible && emojiPickerIconOpen)}
                onMouseEnter={show}
            >
                <IconSticker />
            </div>
        </>
    );
});