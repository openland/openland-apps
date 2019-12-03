import * as React from 'react';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { VariableSizeList } from 'react-window';
import { MyStickers_stickers_packs, StickerFragment } from 'openland-api/Types';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { XView } from 'react-mental';

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
    padding-left: 16px;
    padding-right: 16px;
`;

const stickerRowContainer = css`
    display: flex;
    flex-direction: row;
`;

const sticker = css`
    cursor: pointer;
    width: 106px;
    height: 106px;
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

const titleStyle = css`
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

const InnerElementType = React.forwardRef<HTMLDivElement>((props: any, ref) => {
    const { children, sections, ...rest } = props;
    return (
        <div {...rest} ref={ref}>
            {sections.map((index: StickerPack, i: number) => (
                <div
                    key={'inner_element_emoji' + i}
                    style={{
                        top: (index.start + 3) * 106,
                        left: 0,
                        width: '100%',
                        height:
                            i === sections.length - 1
                                ? (index.end - index.start - 3) * 106 /* WTF? */
                                : (index.end - index.start) * 106 - 66,
                    }}
                >
                    <div className={titleStyle}>
                        <div>{index.title}</div>
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
                const ops = `preview/${100}x${100}/`;
                const opsRetina = `preview/${100 * 2}x${100 * 2}/ 2x`;
                return (
                    <div key={i.id} className={sticker} onClick={() => props.sendSticker(i)}>
                        <ImgWithRetry
                            width={90}
                            height={90}
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

export const StickerComponent = React.memo<{
    onStickerSent?: (sticker: StickerFragment) => void;
}>(props => {
    const client = useClient();
    const stickers = client.useMyStickers({ fetchPolicy: 'cache-and-network' }).stickers;
    const [stickersCount, setStickersCount] = React.useState(0);
    const [stickersPack, setStickersPack] = React.useState<StickerPack[]>([]);

    React.useEffect(
        () => {
            if (stickers.packs) {
                let totalCount = 0;
                let totalPack: StickerPack[] = [];
                for (let p of stickers.packs) {
                    let pack: any = p;
                    pack.start = totalCount;
                    pack.end = pack.start + Math.ceil(p.stickers.length / 3 + 1);
                    totalCount += Math.ceil(p.stickers.length / 3 + 1);
                    totalPack.push(pack);
                }
                setStickersCount(totalCount);
                setStickersPack(totalPack);
            }
        },
        [stickers],
    );

    const sendSticker = (item: StickerFragment) => {
        if (props.onStickerSent) {
            props.onStickerSent(item);
        }
    };

    return (
        <div className={container}>
            <VariableSizeList
                itemCount={stickersCount}
                itemSize={index => {
                    let section = stickersPack.find(v => v.start <= index && index < v.end)!;
                    let i = index - section.start;
                    if (i === 0) {
                        return 40;
                    } else {
                        return 106;
                    }
                }}
                width={384 /* Bigger width to hide scrollbar */}
                height={384}
                overscanCount={6}
                innerElementType={d => <InnerElementType sections={stickersPack} {...d} />}
            >
                {({ index, style }) => {
                    let section = stickersPack.find(v => v.start <= index && index < v.end)!;
                    let i = index - section.start;
                    if (i === 0) {
                        return null;
                    }
                    i--;
                    let stickRow = section.stickers.slice(
                        i * 3,
                        Math.min(section.stickers.length, i * 3 + 3),
                    );
                    return (
                        <div style={style}>
                            <StickersRow stickers={stickRow} sendSticker={sendSticker} />
                        </div>
                    );
                }}
            </VariableSizeList>
            <XView flexDirection="row" paddingHorizontal={16} height={48} />
        </div>
    );
});
