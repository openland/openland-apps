import * as React from 'react';
import { css, cx } from 'linaria';
import IconAnimal from './ic-animal-24.svg';
import IconAnimalFilled from './ic-animal-filled-24.svg';
import IconFood from './ic-food-24.svg';
import IconFoodFilled from './ic-food-filled-24.svg';
import IconObject from './ic-object-24.svg';
import IconObjectFilled from './ic-object-filled-24.svg';
import IconSmile from './ic-smile-24.svg';
import IconSmileFilled from './ic-smile-filled-24.svg';
import IconSport from './ic-sport-24.svg';
import IconSportFilled from './ic-sport-filled-24.svg';
import IconSymbol from './ic-symbol-24.svg';
import IconSymbolFilled from './ic-symbol-filled-24.svg';
import IconTrasport from './ic-transport-24.svg';
import IconTrasportFilled from './ic-transport-filled-24.svg';
import IconRecent from './ic-recent-24.svg';
import IconRecentFilled from './ic-recent-filled-24.svg';

import { usePopper } from '../usePopper';
import { XView } from 'react-mental';
import { FixedSizeList, ListOnScrollProps } from 'react-window';
import { pickerEmoji } from 'openland-y-utils/data/emoji-data';
import { emojiComponentSprite } from 'openland-y-utils/emojiComponentSprite';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { onEmojiSent, getRecent } from './Recent';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import IcSticker from 'openland-icons/s/ic-sticker-24.svg';
import { StickerComponent } from '../stickers/StickerPicker';
import { XLoader } from 'openland-x/XLoader';
import { StickerFragment } from 'openland-api/Types';
import { findEmoji } from 'openland-y-utils/emojiSuggest';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { ChangeEvent } from 'react';

const popperContainerClass = css`
    display: flex;
    flex-direction: column;
    width: 352px;
    height: 480px;
    position: relative;
`;

const emojiContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    overflow: hidden;
`;

const emojiRowContainer = css`
    height: 40px;
    display: flex;
    flex-direction: row;
    padding-left: 16px;
`;

const sectionTitle = css`
    cursor: pointer;
    margin-left: 16px;
    height: 48px;
    line-height: 48px;
    color: var(--foregroundTertiary);
`;

const sectionActiveTitle = css`
    color: var(--foregroundPrimary);
`;

const categoryButton = css`
    position: relative;
    width: 40px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const categoryIconActive = css`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

const categoryIconInactive = css`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

const categorySelector = css`
    position: absolute;
    left: 16px;
    top: 0px;
    height: 2px;
    width: 40px;
    background: #1885f2;
    border-radius: 0px 0px 100px 100px;
    transition: transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

const emojiPickerIcon = css`
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    &:hover {
        opacity: 0.5;
    }
`;

const emojiPickerIconOpen = css`
    opacity: 0.5;
`;

const titleContainerStyle = css`
    position: sticky !important;
    position: -webkit-sticky !important;
    display: flex;
    height: 40px;
    color: var(--foregroundPrimary);
    font-size: 15px;
    line-height: 40px;
    font-weight: 600;
    top: 0px;
    z-index: 2;
    background-color: #fff;
    padding-left: 16px;
    color: var(--foregroundPrimary);
    @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
        background-color: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
    }
`;

const titleTextStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    & > span {
        color: var(--foregroundPrimary);
        margin-right: 4px;
    }
    &:hover {
        opacity: 0.56;
    }
`;

const loaderStyle = css`
    border-radius: 8px;
    height: 432px;
    top: 48px;
`;

const EmojiComponent = React.memo(
    (props: {
        name: string;
        value: string;
        category: string;
        onEmojiPicked: (arg: string) => void;
    }) => {
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
    },
);

interface Emoji {
    name: string;
    value: string;
    sprite: string;
}

interface EmojiSection {
    title: string;
    emoji: Emoji[];
    start: number;
    end: number;
}

const sections: EmojiSection[] = [
    {
        title: 'Smileys & people',
        emoji: pickerEmoji.filter(v => v.category === 0 || v.category === 1),
        start: 0,
        end: 0,
    },
    {
        title: 'Animals & Nature',
        emoji: pickerEmoji.filter(v => v.category === 2),
        start: 0,
        end: 0,
    },
    {
        title: 'Food & Drink',
        emoji: pickerEmoji.filter(v => v.category === 3),
        start: 0,
        end: 0,
    },
    {
        title: 'Travel & Places',
        emoji: pickerEmoji.filter(v => v.category === 4 || v.category === 5),
        start: 0,
        end: 0,
    },
    {
        title: 'Objects',
        emoji: pickerEmoji.filter(v => v.category === 6),
        start: 0,
        end: 0,
    },
    {
        title: 'Symbols',
        emoji: pickerEmoji.filter(v => v.category === 7),
        start: 0,
        end: 0,
    },
    {
        title: 'Flags',
        emoji: pickerEmoji.filter(v => v.category === 8),
        start: 0,
        end: 0,
    },
];
let total = 0;
for (let s of sections) {
    s.start = total;
    s.end = s.start + Math.ceil(s.emoji.length / 8 + 1);
    total += Math.ceil(s.emoji.length / 8 + 1);
}

const RowComponent = React.memo(
    (props: { section: EmojiSection; index: number; onEmojiPicked: (arg: string) => void }) => {
        let index = props.index - props.section.start;
        if (index === 0) {
            return null;
        }
        index--;
        let emoji = props.section.emoji.slice(
            index * 8,
            Math.min(props.section.emoji.length, index * 8 + 8),
        );
        return (
            <div className={emojiRowContainer}>
                {emoji.map(v => (
                    <EmojiComponent
                        name={v.name}
                        value={v.value}
                        category={v.sprite}
                        onEmojiPicked={props.onEmojiPicked}
                        key={'emoji' + v.name}
                    />
                ))}
            </div>
        );
    },
);

const Recent = React.memo((props: { index: number; onEmojiPicked: (arg: string) => void }) => {
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
        <div className={emojiRowContainer}>
            {recent.map(v => (
                <EmojiComponent
                    name={v.name}
                    value={v.value}
                    category={v.sprite}
                    onEmojiPicked={props.onEmojiPicked}
                    key={'recent_emoji' + v.name}
                />
            ))}
        </div>
    );
});

const innerElementType = React.forwardRef<HTMLDivElement>(({ children, ...rest }, ref) => (
    <div ref={ref} {...rest}>
        <div style={{ top: 0, left: 0, width: '100%', height: 3 * 40 }}>
            <div className={titleContainerStyle}>
                <div className={titleTextStyle}>
                    <span className={TextLabel1}>Recent</span>
                </div>
            </div>
        </div>
        {sections.map((index, i) => (
            <div
                key={'inner_element_emoji' + i}
                style={{
                    top: (index.start + 3) * 40,
                    left: 0,
                    width: '100%',
                    height:
                        i === sections.length - 1
                            ? (index.end - index.start - 4) * 40 /* WTF? */
                            : (index.end - index.start) * 40,
                }}
            >
                <div className={titleContainerStyle}>
                    <div className={titleTextStyle}>
                        <span className={TextLabel1}>{index.title}</span>
                    </div>
                </div>
            </div>
        ))}
        {children}
    </div>
));

const CategoryButton = React.memo(
    (props: {
        iconActive: any;
        iconInactive: any;
        focused: boolean;
        offset: number;
        onClick: (offset: number) => void;
    }) => {
        return (
            <div className={categoryButton} onClick={() => props.onClick(props.offset)}>
                <div className={props.focused ? categoryIconActive : categoryIconInactive}>
                    <UIcon color="#1885F2" icon={props.iconActive} size={20} />
                </div>
                <div className={props.focused ? categoryIconInactive : categoryIconActive}>
                    <UIcon color="#676D7A" icon={props.iconInactive} size={20} />
                </div>
            </div>
        );
    },
);

interface EmojiPickerProps {
    onEmojiPicked: (arg: string) => void;
    onStickerSent?: (sticker: StickerFragment) => void;
}

const EmojiPickerBody = React.memo((props: EmojiPickerProps) => {
    const ref = React.useRef<FixedSizeList>(null);
    const [currentSection, setCurrentSection] = React.useState(0);
    const [stickers, setStickers] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [foundEmoji, setFoundEmoji] = React.useState<Emoji[]>([]);
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchInput(searchValue);
        setFoundEmoji(findEmoji(searchValue));
    };
    const onReset = () => {
        setSearchInput('');
    };

    const onScroll = React.useCallback((s: ListOnScrollProps) => {
        let row = Math.round(s.scrollOffset / 40);
        if (row < 3) {
            setCurrentSection(0);
        } else {
            row -= 3;
            let section = sections.findIndex(v => v.start <= row && row < v.end)! + 1;
            setCurrentSection(section);
        }
    }, []);
    const onCategoryClick = React.useCallback((src: number) => {
        if (ref.current) {
            ref.current.scrollToItem(src, 'start');
        }
    }, []);

    return (
        <div className={popperContainerClass}>
            <XView flexDirection="row">
                <div
                    className={cx(TextTitle3, sectionTitle, !stickers && sectionActiveTitle)}
                    onClick={() => setStickers(false)}
                >
                    Emoji
                </div>
                <XWithRole role="super-admin">
                    {props.onStickerSent && (
                        <div
                            className={cx(TextTitle3, sectionTitle, stickers && sectionActiveTitle)}
                            onClick={() => setStickers(true)}
                        >
                            Stickers
                        </div>
                    )}
                </XWithRole>
            </XView>
            {!stickers && (
                <>
                    <XView paddingLeft={16} paddingRight={16} paddingBottom={8}>
                        <USearchInput value={searchInput} onChange={onSearch} onReset={onReset} />
                    </XView>
                    {searchInput.length > 0 && (
                        <div className={emojiContainer}>
                            <XView marginTop={8}>
                                <FixedSizeList
                                    ref={ref}
                                    itemCount={foundEmoji.length / 8}
                                    itemSize={40}
                                    width={384}
                                    height={384}
                                    onScroll={onScroll}
                                >
                                    {({ index: rowIndex, style }) => {
                                        const currentRowEmoji = foundEmoji.slice(rowIndex * 8, rowIndex * 8 + 8);

                                        return (
                                            <div style={style}>
                                                <div className={emojiRowContainer}>
                                                    {currentRowEmoji.map(v => (
                                                        <EmojiComponent
                                                            name={v.name}
                                                            value={v.value}
                                                            category={v.sprite}
                                                            onEmojiPicked={props.onEmojiPicked}
                                                            key={'emoji' + v.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }}
                                </FixedSizeList>
                            </XView>
                        </div>
                    )}

                    {searchInput.length === 0 && (
                        <>
                            <div className={emojiContainer}>
                                <FixedSizeList
                                    ref={ref}
                                    itemCount={total}
                                    itemSize={40}
                                    overscanCount={10}
                                    width={384 /* Bigger width to hide scrollbar */}
                                    height={384}
                                    innerElementType={innerElementType}
                                    onScroll={onScroll}
                                >
                                    {({ index, style }) => {
                                        if (index < 3) {
                                            return (
                                                <div style={style}>
                                                    <Recent
                                                        index={index}
                                                        onEmojiPicked={props.onEmojiPicked}
                                                    />
                                                </div>
                                            );
                                        }
                                        let ii = index - 3;
                                        let section = sections.find(v => v.start <= ii && ii < v.end)!;
                                        return (
                                            <div style={style}>
                                                <RowComponent
                                                    section={section}
                                                    index={ii}
                                                    onEmojiPicked={props.onEmojiPicked}
                                                />
                                            </div>
                                        );
                                    }}
                                </FixedSizeList>
                            </div>
                            <XView flexDirection="row" paddingHorizontal={16} height={48}>
                                <div
                                    className={categorySelector}
                                    style={{ transform: `translateX(${currentSection * 40}px)` }}
                                />
                                <CategoryButton
                                    iconActive={<IconRecentFilled />}
                                    iconInactive={<IconRecent />}
                                    focused={currentSection === 0}
                                    offset={0}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconSmileFilled />}
                                    iconInactive={<IconSmile />}
                                    focused={currentSection === 1}
                                    offset={3 + sections[0].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconAnimalFilled />}
                                    iconInactive={<IconAnimal />}
                                    focused={currentSection === 2}
                                    offset={3 + sections[1].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconFoodFilled />}
                                    iconInactive={<IconFood />}
                                    focused={currentSection === 3}
                                    offset={3 + sections[2].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconSportFilled />}
                                    iconInactive={<IconSport />}
                                    focused={currentSection === 4}
                                    offset={3 + sections[3].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconTrasportFilled />}
                                    iconInactive={<IconTrasport />}
                                    focused={currentSection === 5}
                                    offset={3 + sections[4].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconObjectFilled />}
                                    iconInactive={<IconObject />}
                                    focused={currentSection === 6}
                                    offset={3 + sections[5].start}
                                    onClick={onCategoryClick}
                                />
                                <CategoryButton
                                    iconActive={<IconSymbolFilled />}
                                    iconInactive={<IconSymbol />}
                                    focused={currentSection === 7}
                                    offset={3 + sections[6].start}
                                    onClick={onCategoryClick}
                                />
                            </XView>
                        </>
                    )}
                </>
            )}
            {stickers && (
                <React.Suspense fallback={<XLoader loading={true} className={loaderStyle} />}>
                    <StickerComponent onStickerSent={props.onStickerSent} />
                </React.Suspense>
            )}
        </div>
    );
});

const emojiMobileClassName = css`
    transform: scale(0.8);
    margin-bottom: -40px;
    margin-right: -80px;
`;

export const EmojiPicker = React.memo((props: EmojiPickerProps) => {
    const [width] = useWithWidth();
    const [wrapperClassName, setWrapperClassName] = React.useState<string | undefined>(undefined);

    React.useEffect(
        () => {
            if (width && width <= 450 && !wrapperClassName) {
                setWrapperClassName(emojiMobileClassName);
            }
            if (width && width > 450) {
                setWrapperClassName(undefined);
            }
        },
        [width, wrapperClassName],
    );

    const [visible, show] = usePopper(
        {
            placement: 'top-end',
            hideOnLeave: false,
            wrapperClassName: wrapperClassName,
        },
        () => (
            <EmojiPickerBody
                onEmojiPicked={props.onEmojiPicked}
                onStickerSent={props.onStickerSent}
            />
        ),
    );

    return (
        <div className={cx(emojiPickerIcon, visible && emojiPickerIconOpen)} onMouseEnter={show}>
            <UIcon icon={<IcSticker />} size={20} />
        </div>
    );
});
