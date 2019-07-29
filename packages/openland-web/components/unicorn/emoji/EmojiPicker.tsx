import * as React from 'react';
import { css, cx } from 'linaria';
import IconSticker from './ic_sticker.svg';
import { usePopper } from '../usePopper';
import { XView } from 'react-mental';
import { FixedSizeGrid } from 'react-window';
import e from 'emoji.json';
import { emojiComponent } from 'openland-y-utils/emojiComponent';
import { emojiConvertToName } from 'openland-y-utils/emojiExtract';

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

const EmojiComponent = React.memo((props: { name: string }) => {
    return (
        <XView
            width={40}
            height={40}
            alignItems="center"
            justifyContent="center"
            fontSize={22}
        >
            {emojiComponent(props.name)}
        </XView>
    );
});

const EmojiPickerBody = React.memo(() => {
    return (
        <XView
            flexDirection="column"
            width={352}
            height={480}
        >
            <XView
                paddingHorizontal={16}
                height={48}
                color="#171B1F"
                fontWeight="700"
                fontSize={17}
                lineHeight="48px"
            >
                Emoji
            </XView>
            <XView flexGrow={1} flexBasis={0} minHeight={0} paddingHorizontal={16} overflow="hidden">
                <FixedSizeGrid
                    columnCount={8}
                    rowCount={Math.ceil(e.length / 8)}
                    columnWidth={40}
                    rowHeight={40}
                    width={384 /* Bigger width to hide scrollbar */}
                    height={384}
                >
                    {({ columnIndex, rowIndex, style }) => {
                        if (columnIndex + rowIndex * 8 >= e.length) {
                            return null;
                        }
                        let ch = emojiConvertToName(e[columnIndex + rowIndex * 8].char);
                        return (
                            <div style={style}>
                                <EmojiComponent name={ch} />
                            </div>
                        );
                    }}
                </FixedSizeGrid>
            </XView>
        </XView>
    );
});

export const EmojiPicker = React.memo(() => {
    const [visible, show] = usePopper({ placement: 'top-end', hideOnLeave: true }, () => <EmojiPickerBody />);

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