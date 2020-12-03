import * as React from 'react';
import { css } from 'linaria';
import { withApp } from 'openland-web/components/withApp';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { SuperStickerPackFragment } from 'openland-api/spacex.types';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputErrorText, UInputField } from 'openland-web/components/unicorn/UInput';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { XImage, XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { EmojiPicker } from 'openland-web/components/unicorn/emoji/EmojiPicker';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import DeleteIcon from 'openland-icons/s/ic-close-16.svg';
import { isEmoji } from 'openland-y-utils/isEmoji';

const imageUploadStyle = css`
    & > .avatar-container {
        width: 96px;
        height: 96px;
        border-radius: 8px;
    }
`;

const getAvatar = (uuid: string) => {
    return `https://ucarecdn.com/${uuid}/-/format/auto/-/scale_crop/96x96/center/`;
};

const EditStickerPackModalInner = React.memo((props: {
    hide: () => void;
    stickerPack: SuperStickerPackFragment;
}) => {
    const { hide } = props;
    const client = useClient();
    const { stickerPack } = client.useSuperStickerPack({ id: props.stickerPack.id });
    const form = useForm();
    const titleField = useField('stickers.title', stickerPack?.title || 'New StickerPack', form);
    const publishedField = useField('stickers.published', !!stickerPack?.published, form);
    const imageField = useField<StoredFileT | undefined | null>(
        'sticker.image',
        null,
        form,
        [
            {
                checkIsValid: value => !!value,
                text: 'The image is required'
            }
        ]
    );
    const emojiField = useField('stickers.emoji', '', form, [
        {
            checkIsValid: value => value.length === 0 || value.length > 0 && isEmoji(value),
            text: 'Should be valid emoji'
        }
    ]);

    if (!stickerPack) {
        return null;
    }
    const clearInputs = () => {
        emojiField.input.onChange('');
        imageField.input.onChange(null);
    };
    const items = stickerPack.stickers;
    const addSticker = async () => {
        let id = stickerPack?.id;
        if (!id || !imageField.value || emojiField.input.invalid || imageField.input.invalid) {
            return;
        }

        await client.mutateAddSticker({
            packId: stickerPack.id,
            input: {
                emoji: emojiField.value,
                image: {
                    uuid: imageField.value.uuid,
                    crop: imageField.value.crop
                        ? {
                            x: imageField.value.crop.x,
                            y: imageField.value.crop.y,
                            w: imageField.value.crop.w,
                            h: imageField.value.crop.h,
                        }
                        : null,
                }
            }
        });
        await client.refetchSuperStickerPack({ id });
        clearInputs();
    };
    const removeSticker = async (id: string) => {
        await client.mutateRemoveSticker({ id });
        await client.refetchSuperStickerPack({ id: stickerPack.id });
    };
    const updatePack = async () => {
        await client.mutateStickerPackUpdate({
            id: stickerPack.id, input: {
                title: titleField.value,
                published: publishedField.value,
            }
        });
        await Promise.all([
            client.refetchCreatedStickerPacks(),
            client.refetchSuperStickerPackCatalog()
        ]);
        props.hide();
    };

    return (
        <XView borderRadius={8} flexGrow={1} flexShrink={1}>
            <XModalContent flexGrow={1} flexShrink={1}>
                <UInputField field={titleField} label="Title" />
                <XView width={140}>
                    <UCheckboxFiled field={publishedField} label="Published" />
                    <UButton
                        text="Update"
                        size="large"
                        action={updatePack}
                    />
                </XView>
                <XView {...TextStyles.Title2} marginTop={20}>Add Sticker</XView>
                <XView justifyContent="center" marginBottom={40}>
                    <XView>
                        <XView flexDirection="row">
                            <XView {...TextStyles.Body} marginRight={10}>
                                Image:
                            </XView>
                            <UAvatarUploadField
                                key={imageField.value?.uuid}
                                field={imageField}
                                className={imageUploadStyle}
                            />
                        </XView>
                        {imageField.input.errorText && (
                            <UInputErrorText text={imageField.input.errorText} />
                        )}
                    </XView>
                    <XView>
                        <XView flexDirection="row">
                            <XView {...TextStyles.Body}>
                                Emoji:
                            </XView>
                            <XView width={96} height={40} {...TextStyles.Title3} justifyContent="center" alignItems="center">
                                {emojiField.value}
                                <EmojiPicker
                                    hideOnPicked={true}
                                    onEmojiPicked={emojiField.input.onChange}
                                />
                            </XView>
                        </XView>
                        {emojiField.input.errorText && (
                            <UInputErrorText text={emojiField.input.errorText} />
                        )}
                    </XView>
                    <XView width={140}>
                        <UButton text="Add Sticker" size="large" action={addSticker} />
                    </XView>
                </XView>
                <XView {...TextStyles.Title2} marginTop={20} marginBottom={20}>Stickers</XView>
                <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                    <XView flexDirection="row" flexWrap="wrap" paddingTop={20}>
                        {items.map(item => (
                            <XView key={item.id} alignItems="center" justifyContent="center" padding={10}>
                                <XView position="absolute" top={-16} right={-16} zIndex={2}>
                                    <UIconButton size="small" icon={<DeleteIcon />} onClick={() => removeSticker(item.id)} />
                                </XView>
                                <XImage
                                    src={getAvatar(item.image.uuid)}
                                    width={76}
                                    height={76}
                                    borderRadius={8}
                                />
                                <XView {...TextStyles.Title3} marginTop={10} marginBottom={30}>{item.emoji}</XView>
                            </XView>
                        ))}
                    </XView>
                </XScrollView3>
            </XModalContent>
            <XModalFooter flexShrink={0}>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
            </XModalFooter>
        </XView>
    );
});

const EditStickerPackModal = (props: { hide: () => void, stickerPack?: SuperStickerPackFragment }) => {
    const client = useClient();
    const [stickerPack, setStickerPack] = React.useState(props.stickerPack);
    React.useEffect(() => {
        if (!props.stickerPack) {
            (async () => {
                let { id } = (await client.mutateStickerPackCreate({ title: 'New Sticker Pack' })).stickerPackCreate;
                let pack = (await client.querySuperStickerPack({ id })).stickerPack!;
                setStickerPack(pack);
                client.refetchCreatedStickerPacks();
            })();
        }
    }, []);
    if (!stickerPack) {
        return null;
    }
    return <EditStickerPackModalInner hide={props.hide} stickerPack={stickerPack} />;
};

const showEditStickersModal = (stickerPack?: SuperStickerPackFragment) => {
    showModalBox({ title: 'Edit stickers' }, ctx => (
        <EditStickerPackModal hide={ctx.hide} stickerPack={stickerPack} />
    ));
};

const DeleteStickerPack = ({ hide, id }: { hide: () => void; id: string }) => {
    const client = useClient();

    const remove = async () => {
        await client.mutateStickerPackRemoveFromCollection({
            id: id,
        });
        await Promise.all([
            client.refetchCreatedStickerPacks(),
            client.refetchStickerPackCatalog(),
        ]);
        hide();
    };

    return (
        <XView borderRadius={8}>
            <XModalContent>Are you sure?</XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton text="Delete" style="danger" size="large" onClick={remove} />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteStickerPackModal = (id: string) => {
    showModalBox(
        {
            title: 'Remove sticker pack from collection',
        },
        ctx => <DeleteStickerPack hide={ctx.hide} id={id} />,
    );
};

const StickerPack = (props: { stickerPack: SuperStickerPackFragment, isCollection?: boolean }) => {
    const { stickerPack } = props;
    return (
        <UListItem
            key={stickerPack.id}
            title={stickerPack.title}
            description={stickerPack.author.name}
            avatar={{ photo: stickerPack.stickers[0] && getAvatar(stickerPack.stickers[0].image.uuid), title: stickerPack.title, id: stickerPack.id }}
            onClick={() => null}
            rightElement={
                <XView flexDirection="row">
                    {props.isCollection && (
                        <UButton
                            text="Remove"
                            style="danger"
                            size="small"
                            onClick={() => showDeleteStickerPackModal(stickerPack.id)}
                        />
                    )}
                    <UButton
                        text="Edit"
                        size="small"
                        onClick={() => showEditStickersModal(stickerPack)}
                    />
                </XView>
            }
        />
    );
};

const StickersFragment = React.memo(() => {
    const client = useClient();
    const createdStickers = client.useCreatedStickerPacks().createdStickerPacks;
    const catalogStickers = client.useSuperStickerPackCatalog().stickers;

    return (
        <XView>
            <XView {...TextStyles.Title2} color="var(--foregroundColor)">
                Created
            </XView>
            {createdStickers.length > 0 ? createdStickers.map(pack => (
                <StickerPack stickerPack={pack} />
            )) : <XView>No stickers</XView>}
            <XView {...TextStyles.Title2} color="var(--foregroundColor)">
                Catalog
            </XView>
            {catalogStickers.length > 0 ? catalogStickers.map(pack => (
                <StickerPack stickerPack={pack} isCollection={true} />
            )) : <XView>No stickers</XView>}
        </XView>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    return (
        <DevToolsScaffold title="Edit stickers">
            <XView flexDirection="row" justifyContent="flex-end">
                <UButton text="Create new" onClick={() => showEditStickersModal()} />
            </XView>
            <StickersFragment />
        </DevToolsScaffold>
    );
});
