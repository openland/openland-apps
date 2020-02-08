import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { StickerFragment } from 'openland-api/spacex.types';
import { showModalBox } from 'openland-x/showModalBox';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const stickerPackViewerContainer = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-wrap: wrap;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const stickerContainer = css`
    width: 108px;
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StickerPackModalInner = (props: { packId: string; hide: () => void }) => {
    const [loading, setLoading] = React.useState(false);
    const client = useClient();
    const myStickerPaks = client.useMyStickers();
    const stickerPack = client.useStickerPack({ id: props.packId }).stickerPack;
    if (!stickerPack) {
        return null;
    }
    const iHaveThisPack = !!myStickerPaks.stickers.packs.find(i => i.id === stickerPack.id);

    const addPack = async () => {
        await client.mutateStickerPackAddToCollection({
            id: props.packId,
        });
        await client.refetchMyStickers();
        props.hide();
    };

    const removePack = async () => {
        await client.mutateStickerPackRemoveFromCollection({
            id: props.packId,
        });
        await client.refetchMyStickers();
        props.hide();
    };

    return (
        <XView flexGrow={1} flexShrink={1}>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <div className={stickerPackViewerContainer}>
                    {stickerPack.stickers.map(i => {
                        const url = `https://ucarecdn.com/${i.image.uuid}/-/format/auto/-/`;
                        const ops = `preview/${92}x${92}/`;
                        const opsRetina = `preview/${92 * 2}x${92 * 2}/ 2x`;
                        return (
                            <div key={i.id} className={stickerContainer}>
                                <ImgWithRetry
                                    width={92}
                                    height={92}
                                    src={url + ops}
                                    srcSet={url + opsRetina}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        );
                    })}
                </div>
            </XScrollView3>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="secondary"
                    size="large"
                    onClick={props.hide}
                />
                <UButton
                    text={iHaveThisPack ? 'Delete' : 'Add'}
                    style={iHaveThisPack ? 'danger' : 'primary'}
                    size="large"
                    loading={loading}
                    onClick={async () => {
                        setLoading(true);
                        if (iHaveThisPack) {
                            await removePack();
                        } else {
                            await addPack();
                        }
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showStickerStickerPackModal = (packId: string, name: string) => {
    showModalBox({ title: name, useTopCloser: true, width: 464 }, ctx => (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <StickerPackModalInner packId={packId} hide={ctx.hide} />
        </React.Suspense>
    ));
};

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 192px;
    height: 192px;
    border-radius: 8px;
    cursor: pointer;
`;

interface ImageContentProps {
    sticker: StickerFragment;
}

export const StickerContent = React.memo((props: ImageContentProps) => {
    const { sticker } = props;
    const url = `https://ucarecdn.com/${sticker.image.uuid}/-/format/auto/-/`;
    const ops = `preview/${192}x${192}/`;
    const opsRetina = `preview/${192 * 2}x${192 * 2}/ 2x`;

    return (
        <div
            className={imgContainer}
            onClick={e => {
                if (AppConfig.isNonProduction() || AppConfig.isSuperAdmin()) {
                    e.stopPropagation();
                    if (sticker.pack) {
                        showStickerStickerPackModal(sticker.pack.id, sticker.pack.title);
                    }
                }
            }}
        >
            <ImgWithRetry
                width={192}
                height={192}
                src={url + ops}
                srcSet={url + opsRetina}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
});
