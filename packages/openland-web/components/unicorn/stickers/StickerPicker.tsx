import * as React from 'react';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { ListOnScrollProps, VariableSizeList } from 'react-window';
import { MyStickers_stickers_packs, StickerFragment } from 'openland-api/Types';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

type StickerPack = MyStickers_stickers_packs & {
    start: number;
    end: number;
};

const container = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    overflow: hidden;
`;

const stickersContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
`;

const stickerRowContainer = css`
    display: flex;
    flex-direction: row;
`;

const sticker = css`
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 8px;
    border-radius: 8px;
    &:hover {
        background-color: #f2f3f5;
    }
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
`;

const titleTextStyle = css`
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    will-change: transform;
`;

const categoryContainer = css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    padding-bottom: 20px;
    margin-bottom: -20px;
    overflow-x: scroll;
    height: 68px;
    will-change: transform;
`;

const categoryButton = css`
    position: relative;
    width: 40px;
    height: 48px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    cursor: pointer;
`;

const InnerElementType = React.forwardRef<HTMLDivElement>((props: any, ref) => {
    const { children, sections, ...rest } = props;
    return (
        <div {...rest} ref={ref}>
            {sections.map((index: StickerPack, i: number) => (
                <div
                    key={'inner_element_emoji' + i}
                    style={{
                        top: (index.start + 3) * 80,
                        left: 0,
                        width: '100%',
                        height:
                            i === sections.length - 1
                                ? (index.end - index.start - 3) * 80 /* WTF? this logic */
                                : (index.end - index.start) * 80 - 40,
                    }}
                >
                    <div className={titleContainerStyle}>
                        <div className={titleTextStyle}>{index.title}</div>
                    </div>
                </div>
            ))}
            {children}
        </div>
    );
});

const StickersRow = (props: {
    stickers: StickerFragment[];
    sendSticker: (item: StickerFragment) => void;
}) => {
    return (
        <div className={stickerRowContainer}>
            {props.stickers.map(i => {
                const url = `https://ucarecdn.com/${i.image.uuid}/-/format/auto/-/`;
                const ops = `preview/${64}x${64}/`;
                const opsRetina = `preview/${64 * 2}x${64 * 2}/ 2x`;
                return (
                    <div key={i.id} className={sticker} onClick={() => props.sendSticker(i)}>
                        <ImgWithRetry
                            width={64}
                            height={64}
                            src={url + ops}
                            srcSet={url + opsRetina}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const CategoryButton = React.memo(
    (props: {
        sticker: StickerFragment;
        offset: number;
        focused: boolean;
        onClick: (offset: number) => void;
    }) => {
        let ref = React.useRef<HTMLDivElement>(null);

        const url = `https://ucarecdn.com/${props.sticker.image.uuid}/-/format/auto/-/`;
        const ops = `preview/${24}x${24}/`;
        const opsRetina = `preview/${24 * 2}x${24 * 2}/ 2x`;

        React.useLayoutEffect(
            () => {
                if (props.focused) {
                    ref.current!.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center',
                    });
                }
            },
            [props.focused],
        );
        return (
            <div className={categoryButton} onClick={() => props.onClick(props.offset)} ref={ref}>
                <ImgWithRetry
                    width={24}
                    height={24}
                    src={url + ops}
                    srcSet={url + opsRetina}
                    style={{ objectFit: 'contain' }}
                />
            </div>
        );
    },
);

export const StickerComponent = React.memo<{
    onStickerSent?: (sticker: StickerFragment) => void;
}>(props => {
    const client = useClient();
    const stickers = client.useMyStickers({ fetchPolicy: 'cache-and-network' }).stickers;
    const ref = React.useRef<VariableSizeList>(null);
    const [stickersCount, setStickersCount] = React.useState(0);
    const [stickersPack, setStickersPack] = React.useState<StickerPack[]>([]);
    const [currentSection, setCurrentSection] = React.useState(0);

    React.useEffect(
        () => {
            if (stickers.packs) {
                let totalCount = 0;
                let totalPack: StickerPack[] = [];
                for (let p of stickers.packs) {
                    let pack: any = p;
                    pack.start = totalCount;
                    pack.end = pack.start + Math.ceil(p.stickers.length / 4 + 1);
                    totalCount += Math.ceil(p.stickers.length / 4 + 1);
                    totalPack.push(pack);
                }
                setStickersCount(totalCount);
                setStickersPack(totalPack);
            }
        },
        [stickers],
    );

    const onScroll = React.useCallback(
        (s: ListOnScrollProps) => {
            const row = Math.round(s.scrollOffset / 75 + stickersPack.length / 40) + 1;
            const section = stickersPack.findIndex(v => v.start <= row && row < v.end)!;
            if (section < 0) {
                setCurrentSection(0);
            } else {
                setCurrentSection(section);
            }
        },
        [stickersPack],
    );

    const onCategoryClick = React.useCallback((src: number) => {
        const s = ref.current;
        if (s) {
            s.scrollToItem(src, 'start');
        }
    }, []);

    const sendSticker = (item: StickerFragment) => {
        if (props.onStickerSent) {
            props.onStickerSent(item);
        }
    };

    return (
        <div className={container}>
            <div className={stickersContainer}>
                <VariableSizeList
                    ref={ref}
                    itemCount={stickersCount}
                    itemSize={index => {
                        const section = stickersPack.find(v => v.start <= index && index < v.end)!;
                        let i = index - section.start;
                        if (i === 0) {
                            return 40;
                        } else {
                            return 80;
                        }
                    }}
                    width={384 /* Bigger width to hide scrollbar */}
                    height={384}
                    overscanCount={8}
                    innerElementType={d => <InnerElementType sections={stickersPack} {...d} />}
                    onScroll={onScroll}
                >
                    {({ index, style }) => {
                        const section = stickersPack.find(v => v.start <= index && index < v.end)!;
                        let i = index - section.start;
                        if (i === 0) {
                            return null;
                        }
                        i--;
                        const stickRow = section.stickers.slice(
                            i * 4,
                            Math.min(section.stickers.length, i * 4 + 4),
                        );
                        return (
                            <div style={style}>
                                <StickersRow stickers={stickRow} sendSticker={sendSticker} />
                            </div>
                        );
                    }}
                </VariableSizeList>
            </div>
            <div className={categoryContainer}>
                <div
                    className={categorySelector}
                    style={{ transform: `translateX(${currentSection * 40}px)` }}
                />
                {stickersPack.map((i, j) => {
                    const stickerCover = i.stickers[0];
                    return (
                        <CategoryButton
                            key={i.id}
                            sticker={stickerCover}
                            offset={stickersPack[j].start}
                            onClick={onCategoryClick}
                            focused={currentSection === j}
                        />
                    );
                })}
            </div>
        </div>
    );
});
