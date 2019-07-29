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

const pickerBodyInvisible = css`
    opacity: 0;
`;

const pickerInnerBody = css`
    display: flex;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const PickerBody = React.memo((props: {
    target: HTMLDivElement,
    ctx: UPopperController,
    onHide: () => void
}) => {
    const [visible, setVisible] = React.useState(true);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let isOver = true;
        let timer: any;
        const mouseEvent = (e: MouseEvent) => {

            let overTarget = props.target.contains(e.target as HTMLElement);
            let overMenu = ref.current ? ref.current!.contains(e.target as HTMLElement) : false;
            let isNewOver = overTarget || overMenu;
            if (isOver !== isNewOver) {
                isOver = isNewOver;
                if (isOver) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = undefined;
                    }
                    setVisible(true);
                } else {
                    if (!timer) {
                        timer = setTimeout(() => {
                            setVisible(false);
                        }, 300);
                    }
                }
            }
        };
        document.addEventListener('mouseover', mouseEvent, { passive: true });
        document.addEventListener('click', mouseEvent, { passive: true });
        return () => {
            document.removeEventListener('mouseover', mouseEvent);
            document.addEventListener('click', mouseEvent, { passive: true });
        };
    }, []);
    return (
        <div className={cx(pickerBody, !visible && pickerBodyInvisible)} ref={ref}>
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
            return (
                <PickerBody
                    target={ref.current!}
                    ctx={ctx}
                    onHide={() => {
                        isVisibleRef.current = false;
                        setVisible(false);
                    }}
                />);
        });
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
            >
                <IconSticker />
            </div>
        </>
    );
});