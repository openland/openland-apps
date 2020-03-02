import * as React from 'react';
import { css } from 'linaria';
import { withApp } from '../../components/withApp';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { DiscoverCollections_discoverCollections_items } from 'openland-api/spacex.types';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SearchBox } from 'openland-web/fragments/create/SearchBox';
import { RoomExploreFragment } from './collections.page';

const imageUploadStyle = css`
    & > .avatar-container {
        width: 240px;
        height: 120px;
        border-radius: 8px;
    }
`;

const searchBoxWrapper = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    max-height: 100px;
    overflow: scroll;
    margin-top: 10px;
`;

type Collection = DiscoverCollections_discoverCollections_items;

const EditCollectionForm = React.memo((props: { hide: () => void; collection?: Collection }) => {
    const { hide, collection } = props;
    const client = useClient();

    const defaultOptions = collection
        ? collection.chats.map(i => {
              return { label: i.title, value: i.id };
          })
        : [];

    const defaultMap = new Map<string, string>();

    defaultOptions.forEach(i => defaultMap.set(i.value, i.label));

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRooms, setSelectedRooms] = React.useState<null | Map<string, string>>(
        defaultMap,
    );
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>(
        defaultOptions,
    );

    const form = useForm();

    const titleField = useField('title', collection ? collection.title : '', form, [
        {
            checkIsValid: d => !!d.trim(),
            text: 'invalid',
        },
    ]);

    const avatarField = useField<StoredFileT | undefined | null>(
        'avatar',
        collection ? collection.image : null,
        form,
    );

    const selectRooms = (label: string, value: string) => {
        const selected = selectedRooms || new Map();
        const newOpts: { label: string; value: string }[] = [];
        if (selected.has(value)) {
            selected.delete(value);
        } else {
            selected.set(value, label);
        }
        selected.forEach((l, v) => {
            newOpts.push({
                label: l,
                value: v,
            });
        });
        setSelectedRooms(selected);
        setOptions(newOpts);
    };

    const onInputChange = (data: string) => {
        setSearchQuery(data);
        return data;
    };

    const onChange = (data: { label: string; value: string }[]) => {
        const newSelected = new Map();
        const newOpts: { label: string; value: string }[] = [];
        data.map(i => {
            newSelected.set(i.value, i.label);
            newOpts.push({
                label: i.label,
                value: i.value,
            });
        });
        setSelectedRooms(newSelected);
        setOptions(newOpts);
    };

    const update = () => {
        form.doAction(async () => {
            if (!titleField.value || !avatarField.value || !options.length) {
                return;
            }
            if (collection) {
                await client.mutateDiscoverCollectionsUpdate({
                    id: collection.id,
                    image: {
                        uuid: avatarField.value.uuid,
                        crop: avatarField.value.crop,
                    },
                    title: titleField.value,
                    chatIds: options.map(i => i.value),
                });
            }
            if (!collection) {
                await client.mutateDiscoverCollectionsCreate({
                    image: {
                        uuid: avatarField.value.uuid,
                        crop: avatarField.value.crop,
                    },
                    title: titleField.value,
                    chatIds: options.map(i => i.value),
                });
            }

            await client.refetchDiscoverCollections({ first: 50 });
            await hide();
        });
    };

    return (
        <XView borderRadius={8} flexGrow={1} flexShrink={1}>
            <XModalContent flexGrow={1} flexShrink={1}>
                <UInputField field={titleField} label="Title" marginBottom={10} />
                <UAvatarUploadField
                    field={avatarField}
                    cropParams="16:9"
                    className={imageUploadStyle}
                />
                <div className={searchBoxWrapper}>
                    <SearchBox
                        small={true}
                        onInputChange={onInputChange}
                        value={options}
                        onChange={onChange}
                    />
                </div>
                <XView flexShrink={1} maxHeight={300}>
                    <React.Suspense fallback={null}>
                        <RoomExploreFragment
                            query={searchQuery}
                            onPick={selectRooms}
                            selectedRooms={selectedRooms}
                        />
                    </React.Suspense>
                </XView>
            </XModalContent>
            <XModalFooter flexShrink={0}>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton text={collection ? 'Update' : 'Create'} size="large" onClick={update} />
            </XModalFooter>
        </XView>
    );
});

const showEditCollectionModal = (collection?: Collection) => {
    showModalBox({ title: 'Edit collection' }, ctx => (
        <EditCollectionForm hide={ctx.hide} collection={collection} />
    ));
};

const DeleteCollectionForm = ({ hide, id }: { hide: () => void; id: string }) => {
    const client = useClient();

    const remove = async () => {
        await client.mutateDiscoverCollectionsDelete({
            id: id,
        });
        await client.refetchDiscoverCollections({ first: 50 });
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

export const showDeleteCollectionModal = (id: string) => {
    showModalBox(
        {
            title: 'Remove Super Admin',
        },
        ctx => <DeleteCollectionForm hide={ctx.hide} id={id} />,
    );
};

const CollectionsFragment = React.memo(() => {
    const client = useClient();
    const discoverCollections = client.useDiscoverCollections({ first: 50 }).discoverCollections;
    if (!discoverCollections) {
        return <XView>hasn't collections</XView>;
    }

    const collections = discoverCollections.items;

    const getAvatar = (uuid: string) => {
        return `https://ucarecdn.com/${uuid}/-/format/auto/-/scale_crop/40x40/center/`;
    };

    return (
        <XView>
            {collections.map(i => (
                <UListItem
                    key={i.id}
                    title={i.title}
                    description={`${i.chatsCount} chats`}
                    avatar={{ photo: getAvatar(i.image.uuid), title: i.title, id: i.id }}
                    onClick={() => null}
                    rightElement={
                        <XView flexDirection="row">
                            <UButton
                                text="Delete"
                                style="danger"
                                size="small"
                                onClick={() => showDeleteCollectionModal(i.id)}
                            />
                            <UButton
                                text="Edit"
                                size="small"
                                onClick={() => showEditCollectionModal(i)}
                            />
                        </XView>
                    }
                />
            ))}
        </XView>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    return (
        <DevToolsScaffold title="Edit collections">
            <XView flexDirection="row" justifyContent="flex-end">
                <UButton text="Create new" onClick={() => showEditCollectionModal()} />
            </XView>
            <CollectionsFragment />
        </DevToolsScaffold>
    );
});
