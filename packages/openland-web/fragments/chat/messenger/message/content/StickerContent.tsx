import * as React from 'react';
import { css } from 'linaria';
import { XImage, XView } from 'react-mental';
import { StickerFragment } from 'openland-api/spacex.types';
import { showModalBox } from 'openland-x/showModalBox';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { TextBody, TextStyles, TextTitle1 } from 'openland-web/utils/TextStyles';

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

const StickerPackModalInner = React.memo((props: { packId: string; hide: () => void }) => {
    const [loading, setLoading] = React.useState(false);
    const client = useClient();
    const stickerPack = client.useStickerPack({ id: props.packId }, { fetchPolicy: 'network-only' }).stickerPack;
    if (!stickerPack) {
        return (
            <XView justifyContent="center" alignItems="center" height="100%" width="100%">
                <XImage
                    marginBottom={16}
                    width={320}
                    height={200}
                    src="/static/X/illustration-error.png"
                    srcSet="/static/X/illustration-error@2x.png 2x"
                />
                <XView marginBottom={8} color="var(--foregroundPrimary)">
                    <span className={TextTitle1}>
                        Sticker pack is unavailable
                </span>
                </XView>
                <XView color="var(--foregroundSecondary)" marginBottom={32}>
                    <p className={TextBody}>
                        Sticker pack removed or temporary unavailable
                    </p>
                </XView>
            </XView>
        );
    }
    const iHaveThisPack = !!stickerPack.added;

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
    const isPrivate = !iHaveThisPack && !stickerPack.canAdd;

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
            {isPrivate ? (
                <XModalFooter
                    padding={24}
                    justifyContent="center"
                    alignItems="center"
                >
                    <XView {...TextStyles.Body} color="var(--foregroundSecondary)">This sticker pack is private</XView>
                </XModalFooter>
            ) : (
                    <XModalFooter>
                        <UButton
                            text="Cancel"
                            style="tertiary"
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
                )}
        </XView>
    );
});

export const showStickerStickerPackModal = (packId: string, name: string) => {
    showModalBox({ title: name, useTopCloser: true, width: 464 }, ctx => (
        <React.Suspense
            fallback={(
                <XView minHeight={200}>
                    <XLoader loading={true} transparentBackground={true} />
                </XView>
            )}
        >
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
                e.stopPropagation();
                if (sticker.pack) {
                    showStickerStickerPackModal(sticker.pack.id, sticker.pack.title);
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
