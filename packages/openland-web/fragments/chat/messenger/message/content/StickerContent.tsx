import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import {
    FullMessage_StickerMessage_sticker,
    MyStickers_stickers_packs_stickers,
} from 'openland-api/Types';
import { showModalBox } from 'openland-x/showModalBox';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';

const stickerPackViewerContainer = css`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    flex-shrink: 0;
    flex-wrap: wrap;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const AddStickerPack = (props: { packId: string; hide: () => void }) => {
    const [loading, setLoading] = React.useState(false);
    const client = useClient();
    const myStickerPaks = client.useMyStickers();
    const stickerPack = client.useStickerPack({ packId: props.packId }).stickerPack;
    if (!stickerPack) {
        return null;
    }
    const iHaveThisPack = !!myStickerPaks.stickers.packs.find(i => i.id === stickerPack.id);

    const addPack = async () => {
        await client.mutateStickerPackAddToCollection({
            packId: props.packId,
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
                        const ops = `scale_crop/${100}x${100}/`;
                        const opsRetina = `scale_crop/${100 * 2}x${100 * 2}/center/ 2x`;
                        return (
                            <img
                                key={i.id}
                                width={100}
                                height={100}
                                src={url + ops}
                                srcSet={url + opsRetina}
                            />
                        );
                    })}
                </div>
            </XScrollView3>
            <XModalFooter>
                <UButton text="Close" style="secondary" size="large" square={true} />
                {!iHaveThisPack && (
                    <UButton
                        text="Add"
                        size="large"
                        square={true}
                        loading={loading}
                        onClick={async () => {
                            setLoading(true);
                            await addPack();
                        }}
                    />
                )}
            </XModalFooter>
        </XView>
    );
};

const showAddStickerPack = (packId: string, name: string) => {
    showModalBox({ title: name, useTopCloser: true }, ctx => (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <AddStickerPack packId={packId} hide={ctx.hide} />
        </React.Suspense>
    ));
};

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    cursor: pointer;
`;

interface ImageContentProps {
    sticker: MyStickers_stickers_packs_stickers | FullMessage_StickerMessage_sticker;
}

export const StickerContent = React.memo((props: ImageContentProps) => {
    const url = `https://ucarecdn.com/${props.sticker.image.uuid}/-/format/auto/-/`;
    const ops = `scale_crop/${100}x${100}/`;
    const opsRetina = `scale_crop/${100 * 2}x${100 * 2}/center/ 2x`;

    return (
        <div
            className={imgContainer}
            onClick={e => {
                if (AppConfig.isNonProduction() || AppConfig.isSuperAdmin()) {
                    e.stopPropagation();
                    if ((props.sticker as FullMessage_StickerMessage_sticker).pack) {
                        showAddStickerPack(
                            (props.sticker as FullMessage_StickerMessage_sticker).pack.id,
                            (props.sticker as FullMessage_StickerMessage_sticker).pack.title,
                        );
                    }
                }
            }}
        >
            <img width={100} height={100} src={url + ops} srcSet={url + opsRetina} />
        </div>
    );
});
