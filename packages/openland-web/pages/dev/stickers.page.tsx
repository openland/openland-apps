import * as React from 'react';
import { css } from 'linaria';
import { withApp } from 'openland-web/components/withApp';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { SuperStickerPackFragment, SuperStickerPack_stickerPack_stickers } from 'openland-api/spacex.types';
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
import AddIcon from 'openland-icons/s/ic-plus-24.svg';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { randomKey } from 'openland-unicorn/components/utils/randomKey';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import ArrowLeft from 'openland-icons/s/ic-arrow-left-16.svg';

const imageUploadStyle = css`
    & > .avatar-container {
        width: 96px;
        height: 96px;
        border-radius: 8px;
    }
`;

const getAvatar = (uuid: string) => {
    return `https://ucarecdn.com/${uuid}/-/format/jpeg/`;
};

type StickerToAdd = {
    image: { value?: StoredFileT | undefined | null, errorText?: string },
    emoji: { value?: string, errorText?: string }
};

const AddStickerForm = ({ id, onChange, onRemove }: {
    id?: string,
    onChange: (sticker: StickerToAdd) => void,
    onRemove: () => void,
}) => {
    const form = useForm();
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

    React.useEffect(() => {
        onChange({
            image: { value: imageField.value, errorText: imageField.input.errorText },
            emoji: { value: emojiField.value, errorText: emojiField.input.errorText }
        });
    }, [emojiField.value, imageField.value]);
    return (
        <XView justifyContent="center" marginBottom={10} marginRight={10}>
            <XView>
                <XView flexDirection="row">
                    <XView {...TextStyles.Body} marginRight={10}>
                        Image:
                            </XView>
                    <UAvatarUploadField
                        key={imageField.value?.uuid}
                        field={imageField}
                        className={imageUploadStyle}
                        cropParams={false}
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
                            onEmojiPicked={emojiField.input.onChange}
                        />
                    </XView>
                </XView>
                {emojiField.input.errorText && (
                    <UInputErrorText text={emojiField.input.errorText} />
                )}
            </XView>
            <XView position="absolute" top={0} right={0} zIndex={2}>
                <UIconButton size="small" icon={<DeleteIcon />} onClick={() => onRemove()} />
            </XView>
        </XView>
    );
};

const AddedSticker = (props: {
    item: SuperStickerPack_stickerPack_stickers,
    packId: string,
    onPrevClick: (id: string) => void,
    onNextClick: (id: string) => void,
}) => {
    const client = useClient();
    const { item, packId, onNextClick, onPrevClick } = props;

    const removeSticker = async (id: string) => {
        await client.mutateRemoveSticker({ id });
        await client.refetchSuperStickerPack({ id: packId });
    };

    return (
        <div className="x" style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <XView position="absolute" top={-16} right={-16} zIndex={2}>
                <UIconButton size="small" icon={<DeleteIcon />} onClick={() => removeSticker(item.id)} />
            </XView>
            <XImage
                src={getAvatar(item.image.uuid)}
                width={76}
                height={76}
                borderRadius={8}
            />
            <XView {...TextStyles.Title3} marginTop={10} marginBottom={30} flexDirection="row">
                <UIconButton size="xsmall" icon={<ArrowLeft />} onClick={() => onPrevClick(item.id)} color="var(--foregroundTertiary)" />
                {item.emoji}
                <UIconButton size="xsmall" icon={<ArrowRight />} onClick={() => onNextClick(item.id)} color="var(--foregroundTertiary)" />
            </XView>
        </div>
    );
};

const EditStickerPackModalInner = React.memo((props: {
    hide: () => void;
    stickerPack: SuperStickerPackFragment;
}) => {
    const { hide } = props;
    const client = useClient();
    const { stickerPack } = client.useSuperStickerPack({ id: props.stickerPack.id }, { fetchPolicy: 'cache-and-network' });
    const form = useForm();
    const titleField = useField('stickers.title', stickerPack?.title || 'New StickerPack', form);
    const publishedField = useField('stickers.published', !!stickerPack?.published, form);
    const privateField = useField('stickers.private', !!stickerPack?.private, form);
    const [stickersToAdd, setStickersToAdd] = React.useState<(StickerToAdd & { key: string })[]>([]);

    if (!stickerPack) {
        return null;
    }

    const [items, setItems] = React.useState(stickerPack.stickers);
    const listRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setItems(stickerPack.stickers);
    }, [stickerPack.stickers]);

    const updatePack = async () => {
        await client.mutateStickerPackUpdate({
            id: stickerPack.id, input: {
                title: titleField.value,
                published: publishedField.value,
                private: privateField.value
            }
        });
        await Promise.all([
            client.refetchSuperAllStickerPacks(),
            client.refetchSuperStickerPackCatalog(),
            client.refetchSuperStickerPack({ id: props.stickerPack.id }),
        ]);
        props.hide();
    };
    const addStickerForm = () => {
        setStickersToAdd(prev => prev.concat({ image: {}, emoji: {}, key: randomKey() }));
    };
    const handleAddStickerChange = (index: number, sticker: StickerToAdd) => {
        setStickersToAdd(prev =>
            prev.slice(0, index)
                .concat({ ...sticker, key: prev[index].key })
                .concat(...prev.slice(index + 1)
                ));
    };
    const handleRemoveStickerChange = (key: string) => {
        setStickersToAdd(prev => prev.filter((x) => x.key !== key));
    };
    const addStickers = async () => {
        let id = stickerPack.id;
        let hasErrorText = stickersToAdd.some(x => x.emoji.errorText || x.image.errorText);
        if (!id || hasErrorText) {
            return;
        }
        let promises = stickersToAdd.filter(s => s.image.value?.uuid).map(s => client.mutateAddSticker({
            packId: id,
            input: {
                emoji: s.emoji.value || '',
                image: {
                    uuid: s.image.value!.uuid,
                    crop: s.image.value!.crop
                        ? {
                            x: s.image.value!.crop.x,
                            y: s.image.value!.crop.y,
                            w: s.image.value!.crop.w,
                            h: s.image.value!.crop.h,
                        }
                        : null,
                }
            }
        }));
        await Promise.all(promises);
        await client.refetchSuperStickerPack({ id });
        setStickersToAdd([]);
    };
    const saveOrder = async () => {
        await client.mutateStickerPackUpdate({
            id: stickerPack.id, input: { stickers: items.map(x => x.id) }
        });
        await Promise.all([
            client.refetchSuperAllStickerPacks(),
            client.refetchSuperStickerPackCatalog(),
            client.refetchSuperStickerPack({ id: props.stickerPack.id }),
        ]);
    };

    return (
        <XView borderRadius={8} flexGrow={1} flexShrink={1}>
            <XModalContent flexGrow={1} flexShrink={1}>
                <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                    <UInputField field={titleField} label="Title" />
                    <XView width={140}>
                        <UCheckboxFiled field={publishedField} label="Published" />
                        <UCheckboxFiled field={privateField} label="Private" />
                        <UButton
                            text="Update"
                            size="large"
                            action={updatePack}
                        />
                    </XView>
                    <XView {...TextStyles.Title2} marginTop={20}>Add Sticker</XView>
                    <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                        <XView flexDirection="row" flexWrap="wrap">
                            {stickersToAdd.map((s, i) => (
                                <AddStickerForm
                                    key={s.key}
                                    onChange={sticker => handleAddStickerChange(i, sticker)}
                                    onRemove={() => handleRemoveStickerChange(s.key)}
                                />
                            ))}
                        </XView>
                    </XScrollView3>
                    <XView>
                        <UIconButton icon={<AddIcon />} onClick={() => addStickerForm()} />
                    </XView>
                    <XView width={140} marginTop={20}>
                        <UButton text="Add Stickers" size="large" action={addStickers} />
                    </XView>
                    <XView {...TextStyles.Title2} marginTop={20} marginBottom={20}>Stickers</XView>

                    <div className="x" ref={listRef} style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 20 }}>
                        {items.map((item, index) => (
                            <AddedSticker
                                key={item.id + index}
                                item={item}
                                packId={stickerPack.id}
                                onNextClick={(id) => {
                                    setItems(prev => prev.map((x, i, arr) => {
                                        if (x.id === id && i !== arr.length - 1) {
                                            return arr[i + 1];
                                        } else if (arr[i - 1] && (arr[i - 1].id === id)) {
                                            return arr[i - 1];
                                        }
                                        return x;
                                    }));
                                }}
                                onPrevClick={(id) => {
                                    setItems(prev => prev.map((x, i, arr) => {
                                        if (x.id === id && i !== 0) {
                                            return arr[i - 1];
                                        } else if (arr[i + 1] && (arr[i + 1].id === id)) {
                                            return arr[i + 1];
                                        }
                                        return x;
                                    }));
                                }}
                            />
                        ))}
                    </div>
                </XScrollView3>
                <XView width={140} marginTop={20}>
                    <UButton text="Save order" size="large" action={saveOrder} />
                </XView>
            </XModalContent>
            <XModalFooter flexShrink={0}>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
            </XModalFooter>
        </XView >
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
                client.refetchSuperAllStickerPacks();
            })();
        }
    }, []);
    if (!stickerPack) {
        return null;
    }
    return <EditStickerPackModalInner hide={props.hide} stickerPack={stickerPack} />;
};

const showEditStickersModal = (stickerPack?: SuperStickerPackFragment) => {
    showModalBox({ title: 'Edit stickers', width: 600 }, ctx => (
        <EditStickerPackModal hide={ctx.hide} stickerPack={stickerPack} />
    ));
};

// const DeleteStickerPack = ({ hide, id }: { hide: () => void; id: string }) => {
//     const client = useClient();

//     const remove = async () => {
//         await client.mutateStickerPackRemoveFromCollection({
//             id: id,
//         });
//         await Promise.all([
//             client.refetchCreatedStickerPacks(),
//             client.refetchStickerPackCatalog(),
//         ]);
//         hide();
//     };

//     return (
//         <XView borderRadius={8}>
//             <XModalContent>Are you sure?</XModalContent>
//             <XModalFooter>
//                 <XView marginRight={12}>
//                     <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
//                 </XView>
//                 <UButton text="Delete" style="danger" size="large" onClick={remove} />
//             </XModalFooter>
//         </XView>
//     );
// };

// export const showDeleteStickerPackModal = (id: string) => {
//     showModalBox(
//         {
//             title: 'Remove sticker pack from collection',
//         },
//         ctx => <DeleteStickerPack hide={ctx.hide} id={id} />,
//     );
// };

const StickerPack = (props: { stickerPack: SuperStickerPackFragment, isCatalog?: boolean }) => {
    const { stickerPack } = props;
    const client = useClient();
    const remove = async () => {
        await client.mutateStickerPackRemoveFromCollection({
            id: stickerPack.id,
        });
        await client.refetchStickerPack({ id: stickerPack.id });
    };
    const add = async () => {
        await client.mutateStickerPackAddToCollection({
            id: stickerPack.id,
        });
        await client.refetchStickerPack({ id: stickerPack.id });
    };
    return (
        <UListItem
            key={stickerPack.id}
            title={stickerPack.title}
            description={stickerPack.author.name}
            textRight={stickerPack.published ? 'Published' : undefined}
            avatar={{ photo: stickerPack.stickers[0] && getAvatar(stickerPack.stickers[0].image.uuid), title: stickerPack.title, id: stickerPack.id }}
            onClick={() => null}
            rightElement={
                <XView flexDirection="row" marginLeft={20}>
                    {!props.isCatalog && (
                        <>
                            {stickerPack.added ? (
                                <UButton
                                    marginRight={10}
                                    text="Remove from me"
                                    style="danger"
                                    size="small"
                                    action={remove}
                                />
                            ) : (
                                    <UButton
                                        marginRight={10}
                                        text="Add to me"
                                        style="success"
                                        size="small"
                                        action={add}
                                    />
                                )}
                        </>
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
    const allStickers = client.useSuperAllStickerPacks().superAllStickerPacks;
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
                <StickerPack stickerPack={pack} isCatalog={true} />
            )) : <XView>No stickers</XView>}
            <XView {...TextStyles.Title2} color="var(--foregroundColor)">
                All
            </XView>
            {allStickers.length > 0 ? allStickers.map(pack => (
                <StickerPack stickerPack={pack} />
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
