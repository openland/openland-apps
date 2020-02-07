import * as React from 'react';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { ListOnScrollProps, VariableSizeList } from 'react-window';
import { MyStickers_stickers_packs, StickerFragment } from 'openland-api/Types';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { showStickerStickerPackModal } from 'openland-web/fragments/chat/messenger/message/content/StickerContent';
import { TextLabel1, TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import AlertBlanket from 'openland-x/AlertBlanket';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';
import IcDelete from 'openland-icons/s/ic-close-16.svg';

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

const stubContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const stubTitle = css`
    text-align: center;
    color: var(--foregroundPrimary);
    margin-bottom: 4px;
`;

const stubSubtitle = css`
    text-align: center;
    color: var(--foregroundSecondary);
    margin-bottom: 16px;
    max-width: 280px;
`;

const stickersContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    overflow: hidden;
`;

const stickerRowContainer = css`
    display: flex;
    flex-direction: row;
    padding-left: 16px;
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
    width: 100%;
    position: sticky !important;
    position: -webkit-sticky !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    color: var(--foregroundPrimary);
    font-size: 15px;
    line-height: 40px;
    font-weight: 600;
    top: 0px;
    z-index: 2;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 4px;
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

const deletePackContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    &:hover {
        opacity: 0.56;
    }
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
    overflow-y: hidden;
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
    const client = useClient();
    const [show] = useCaptionPopper({
        text: 'Delete stickers',
        placement: 'top',
        marginBottom: -10,
        marginRight: -2,
        scope: 'stickers-deleting',
    });

    const removePack = (packId: string) => {
        AlertBlanket.builder()
            .title(`Delete stickerpack?`)
            .message(`Are you sure you want to delete stickerpack? This cannot be undone.`)
            .action(
                'Delete',
                async () => {
                    await client.mutateStickerPackRemoveFromCollection({
                        id: packId,
                    });
                    await client.refetchMyStickers();
                },
                'danger',
            )
            .show();
    };

    return (
        <div {...rest} ref={ref}>
            {sections.map((pack: StickerPack, i: number) => (
                <div
                    key={'inner_element_emoji' + i}
                    style={{
                        top: (pack.start + 3) * 80,
                        left: 0,
                        width: 352,
                        height:
                            i === sections.length - 1
                                ? (pack.end - pack.start - 3) * 80 /* WTF? this logic */
                                : (pack.end - pack.start) * 80 - 40,
                    }}
                >
                    <div className={titleContainerStyle}>
                        <div
                            className={titleTextStyle}
                            onClick={() => showStickerStickerPackModal(pack.id, pack.title)}
                        >
                            <span className={TextLabel1}>{pack.title}</span>
                            <UIcon icon={<IcArrow />} color="var(--foregroundTertiary)" />
                        </div>
                        <div
                            className={deletePackContainer}
                            onMouseEnter={show}
                            onClick={() => removePack(pack.id)}
                        >
                            <UIcon icon={<IcDelete />} />
                        </div>
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
    (props: { sticker: StickerFragment; offset: number; onClick: (offset: number) => void }) => {
        const url = `https://ucarecdn.com/${props.sticker.image.uuid}/-/format/auto/-/`;
        const ops = `preview/${24}x${24}/`;
        const opsRetina = `preview/${24 * 2}x${24 * 2}/ 2x`;

        return (
            <div className={categoryButton} onClick={() => props.onClick(props.offset)}>
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
    const categoriesRef = React.useRef<HTMLDivElement>(null);
    const [stickersCount, setStickersCount] = React.useState(0);
    const [stickersPack, setStickersPack] = React.useState<StickerPack[]>([]);
    const [currentSection, setCurrentSection] = React.useState(0);

    const categoriesScrolling = () => {
        if (categoriesRef.current) {
            categoriesRef.current.scrollTo({
                left: currentSection * 40,
                behavior: 'smooth',
            });
        }
    };

    React.useEffect(
        () => {
            if (!!stickers.packs.length) {
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

    React.useLayoutEffect(() => categoriesScrolling(), [currentSection]);

    const onCategoryClick = React.useCallback(
        (src: number) => {
            if (ref.current && categoriesRef.current) {
                ref.current.scrollToItem(src, 'start');
                categoriesScrolling();
            }
        },
        [currentSection],
    );

    const sendSticker = (item: StickerFragment) => {
        if (props.onStickerSent) {
            props.onStickerSent(item);
        }
    };

    if (!stickers.packs.length) {
        return (
            <div className={stubContainer}>
                <div className={cx(TextTitle3, stubTitle)}>No stickers</div>
                <div className={cx(TextBody, stubSubtitle)}>
                    Communication is more fun with stickers. Let’s find cool sticker pack for you!
                </div>
                <UButton text="Find stickers" />
            </div>
        );
    }

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
            <div className={categoryContainer} ref={categoriesRef}>
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
                        />
                    );
                })}
            </div>
        </div>
    );
});
