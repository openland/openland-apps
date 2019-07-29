import * as React from 'react';
import { css, cx } from 'linaria';
import IconSticker from './ic_sticker.svg';
import { showPopper, UPopperController } from '../UPopper';

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

const pickerBody = css`
    display: flex;
    padding-bottom: 16px;
`;

const pickerInnerBody = css`
    display: flex;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const PickerBody = React.memo((props) => {
    return (
        <div className={pickerBody}>
            <div className={pickerInnerBody}>
                Hello!
            </div>
        </div>
    );
});

export const EmojiPicker = React.memo(() => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = React.useState(false);
    const isVisibleRef = React.useRef(false);
    const ctxRef = React.useRef<UPopperController>();
    const onMouseOverIcon = React.useCallback(() => {
        if (isVisibleRef.current) {
            return;
        }
        isVisibleRef.current = true;
        setVisible(true);
        showPopper(ref.current!, 'top-end', (ctx) => {
            ctxRef.current = ctx;
            return (<PickerBody />);
        });
    }, []);
    const onMouseLeaveIcon = React.useCallback(() => {
        setTimeout(() => {
            let r = ctxRef.current;
            if (r) {
                ctxRef.current = undefined;
                isVisibleRef.current = false;
                setVisible(false);
                r.hide();
            }
        }, 1000);
    }, []);
    React.useEffect(() => {
        return () => {
            let r = ctxRef.current;
            if (r) {
                r.hide();
            }
        };
    }, []);

    return (
        <>
            <div
                ref={ref}
                className={cx(emojiPickerIcon, isVisible && emojiPickerIconOpen)}
                onMouseEnter={onMouseOverIcon}
                onMouseLeave={onMouseLeaveIcon}
            >
                <IconSticker />
            </div>
        </>
    );
});