import * as React from 'react';
import { css, cx } from 'linaria';
import IconSticker from './ic_sticker.svg';

const emojiPickerIcon = css`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: opacity 150ms cubic-bezier(.29, .09, .24, .99);

    &:hover {
        opacity: 0.5;
    }
`;

const emojiPickerIconOpen = css`
    opacity: 0.5;
`;

const pickerBody = css`

`;

const PickerBody = React.memo((props) => {
    return null;
});

export const EmojiPicker = React.memo(() => {

    const [isVisible, setVisible] = React.useState(false);
    const onMouseOverIcon = React.useCallback(() => {
        setVisible(true);
    }, []);
    const onMouseLeaveIcon = React.useCallback(() => {
        setTimeout(() => {
            setVisible(false);
        }, 1000);
    }, []);

    return (
        <>
            <div
                className={cx(emojiPickerIcon, isVisible && emojiPickerIconOpen)}
                onMouseOver={onMouseOverIcon}
                onMouseLeave={onMouseLeaveIcon}
            >
                <IconSticker />
            </div>
            <div className={cx(pickerBody)}>
                <PickerBody />
            </div>
        </>
    );
});