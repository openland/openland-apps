import * as React from 'react';
import { css, cx } from 'linaria';
import IconSticker from './ic_sticker2.svg';
import { usePopper } from '../usePopper';
import { XView } from 'react-mental';
import { FixedSizeList } from 'react-window';
import { pickerEmoji } from 'openland-y-utils/data/emoji-data';
import { emojiComponentSprite } from 'openland-y-utils/emojiComponentSprite';
import { onEmojiSent, getRecent } from './Recent';

const emojiPickerIcon = css`
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 8px;
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

const titleStyle = css`
    position: sticky !important;
    position: -webkit-sticky !important;
    display: flex;
    height: 40px;
    color: #171B1F;
    font-size: 15px;
    line-height: 40px;
    font-weight: 600;
    top: 0px;
    z-index: 2;

    background-color: #fff;
    /* @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
        margin-top: -16px;
        padding-top: 16px;
        background-color: rgba(0,0,0,0);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    } */
`;

const titleBgStyle = css`
    width: '100%';
    height: '100%';
    /* background-color: rgba(255,255,255,0.72); */
`;

const EmojiComponent = React.memo((props: { name: string, value: string, category: string, onEmojiPicked: (arg: string) => void }) => {
    return (
        <XView
            width={40}
            height={40}
            alignItems="center"
            justifyContent="center"
            fontSize={22}
            onClick={() => {
                onEmojiSent(props.name);
                props.onEmojiPicked(props.value);
            }}
            hoverBackgroundColor="#F2F3F5"
            paddingTop={6 /* Emoji are aligned by baseline and we need to compensate this */}
            borderRadius={8}
            cursor="pointer"
        >
            {emojiComponentSprite(props.name, props.category)}
        </XView>
    );
});

interface EmojiSection {
    title: string;
    emoji: { name: string, value: string, sprite: string }[];
    start: number;
    end: number;
}

const sections: EmojiSection[] = [{
    title: 'Smileys & people',
    emoji: pickerEmoji.filter((v) => v.category === 0 || v.category === 1),
    start: 0,
    end: 0
}, {
    title: 'Animals & Nature',
    emoji: pickerEmoji.filter((v) => v.category === 2),
    start: 0,
    end: 0
}, {
    title: 'Food & Drink',
    emoji: pickerEmoji.filter((v) => v.category === 3),
    start: 0,
    end: 0
}, {
    title: 'Travel & Places',
    emoji: pickerEmoji.filter((v) => v.category === 4 || v.category === 5),
    start: 0,
    end: 0
}, {
    title: 'Objects',
    emoji: pickerEmoji.filter((v) => v.category === 6),
    start: 0,
    end: 0
}, {
    title: 'Symbols',
    emoji: pickerEmoji.filter((v) => v.category === 7),
    start: 0,
    end: 0
}, {
    title: 'Flags',
    emoji: pickerEmoji.filter((v) => v.category === 8),
    start: 0,
    end: 0
}];
let total = 0;
for (let s of sections) {
    s.start = total;
    s.end = s.start + Math.ceil(s.emoji.length / 8 + 1);
    total += Math.ceil(s.emoji.length / 8 + 1);
}

const RowComponent = React.memo((props: { section: EmojiSection, index: number, onEmojiPicked: (arg: string) => void }) => {
    let index = props.index - props.section.start;
    if (index === 0) {
        return null;
    }
    index--;
    let emoji = props.section.emoji.slice(index * 8, Math.min(props.section.emoji.length, index * 8 + 8));
    return (
        <XView height={40} flexDirection="row">
            {emoji.map((v) => (
                <EmojiComponent
                    name={v.name}
                    value={v.value}
                    category={v.sprite}
                    onEmojiPicked={props.onEmojiPicked}
                />
            ))}
        </XView>
    );
});

const Recent = React.memo((props: { index: number, onEmojiPicked: (arg: string) => void }) => {
    if (props.index === 0) {
        return null;
    }

    let recent = React.useMemo(() => getRecent(), []);

    if (props.index === 1) {
        recent.splice(8, 16);
    } else {
        recent.splice(0, 8);
    }
    return (
        <XView height={40} flexDirection="row">
            {recent.map((v) => (
                <EmojiComponent
                    name={v.name}
                    value={v.value}
                    category={v.sprite}
                    onEmojiPicked={props.onEmojiPicked}
                />
            ))}
        </XView>
    );
});

const innerElementType = React.forwardRef<HTMLDivElement>(({ children, ...rest }, ref) => (
    <div ref={ref} {...rest}>
        <div style={{ top: 0, left: 0, width: "100%", height: 3 * 40 }}>
            <div className={titleStyle}>
                <div className={titleBgStyle}>
                    Recent
                </div>
            </div>
        </div>
        {sections.map((index, i) => (
            <div style={{ top: (index.start + 3) * 40, left: 0, width: "100%", height: i === sections.length - 1 ? (index.end - index.start - 4) * 40 /* WTF? */ : (index.end - index.start) * 40 }}>
                <div className={titleStyle}>
                    <div className={titleBgStyle}>
                        {index.title}
                    </div>
                </div>
            </div>
        ))}
        {children}
    </div>
));

const EmojiPickerBody = React.memo((props: { onEmojiPicked: (arg: string) => void }) => {
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
            <XView
                flexGrow={1}
                flexBasis={0}
                minHeight={0}
                paddingHorizontal={16}
                overflow="hidden"
            >
                <FixedSizeList
                    itemCount={total}
                    itemSize={40}
                    overscanCount={10}
                    width={384 /* Bigger width to hide scrollbar */}
                    height={384}
                    innerElementType={innerElementType}
                >
                    {({ index, style }) => {
                        if (index < 3) {
                            return (
                                <div style={style}>
                                    <Recent index={index} onEmojiPicked={props.onEmojiPicked} />
                                </div>
                            );
                        }
                        let ii = index - 3;
                        let section = sections.find((v) => v.start <= ii && ii < v.end)!;
                        return (
                            <div style={style}>
                                <RowComponent section={section} index={ii} onEmojiPicked={props.onEmojiPicked} />
                            </div>
                        );
                    }}
                </FixedSizeList>
            </XView>
        </XView>
    );
});

export const EmojiPicker = React.memo((props: { onEmojiPicked: (arg: string) => void }) => {
    const [visible, show] = usePopper({ placement: 'top-end', hideOnLeave: true }, () => <EmojiPickerBody onEmojiPicked={props.onEmojiPicked} />);

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