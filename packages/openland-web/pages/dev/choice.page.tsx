import * as React from 'react';
import { css } from 'linaria';
import { withApp } from '../../components/withApp';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { DiscoverEditorsChoice_discoverEditorsChoice } from 'openland-api/spacex.types';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
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

type Choice = DiscoverEditorsChoice_discoverEditorsChoice;

const EditChoiceForm = React.memo((props: { hide: () => void; choice?: Choice }) => {
    const { hide, choice } = props;
    const client = useClient();

    const defaultOptions = choice ? [{ label: choice.chat.title, value: choice.chat.id }] : [];

    const defaultMap = new Map<string, string>();

    defaultOptions.forEach(i => defaultMap.set(i.value, i.label));

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRooms, setSelectedRooms] = React.useState<null | Map<string, string>>(
        defaultMap,
    );
    const [option, setOption] = React.useState<{ label: string; value: string }[]>(defaultOptions);

    const form = useForm();

    const avatarField = useField<StoredFileT | undefined | null>(
        'avatar',
        choice ? choice.image : null,
        form,
    );

    const selectRooms = (label: string, value: string) => {
        const selected = new Map();
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
        setOption(newOpts);
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
        setOption(newOpts);
    };

    const update = () => {
        form.doAction(async () => {
            if (!avatarField.value || !option.length) {
                return;
            }
            if (choice) {
                await client.mutateDiscoverEditorsChoiceUpdate({
                    id: choice.id,
                    image: {
                        uuid: avatarField.value.uuid,
                        crop: avatarField.value.crop ? {
                            x: avatarField.value.crop.x,
                            y: avatarField.value.crop.y,
                            w: avatarField.value.crop.w,
                            h: avatarField.value.crop.h,
                        } : null,
                    },
                    cid: option[0].value,
                });
            }
            if (!choice) {
                await client.mutateDiscoverEditorsChoiceCreate({
                    image: {
                        uuid: avatarField.value.uuid,
                        crop: avatarField.value.crop,
                    },
                    cid: option[0].value,
                });
            }

            await client.refetchDiscoverEditorsChoice();
            await hide();
        });
    };

    return (
        <XView borderRadius={8} flexGrow={1} flexShrink={1}>
            <XModalContent flexGrow={1} flexShrink={1}>
                <UAvatarUploadField
                    field={avatarField}
                    cropParams="16:9"
                    className={imageUploadStyle}
                />
                <div className={searchBoxWrapper}>
                    <SearchBox
                        multi={false}
                        small={true}
                        onInputChange={onInputChange}
                        value={option}
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
                <UButton text={choice ? 'Update' : 'Create'} size="large" onClick={update} />
            </XModalFooter>
        </XView>
    );
});

const showEditChoiceModal = (choice?: Choice) => {
    showModalBox({ title: 'Edit choice' }, ctx => (
        <EditChoiceForm hide={ctx.hide} choice={choice} />
    ));
};

const DeleteChoiceForm = ({ hide, id }: { hide: () => void; id: string }) => {
    const client = useClient();

    const remove = async () => {
        await client.mutateDiscoverEditorsChoiceDelete({
            id: id,
        });
        await client.refetchDiscoverEditorsChoice();
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

export const showDeleteChoiceModal = (id: string) => {
    showModalBox(
        {
            title: 'Delete choice',
        },
        ctx => <DeleteChoiceForm hide={ctx.hide} id={id} />,
    );
};

const ChoiceFragment = React.memo(() => {
    const client = useClient();
    const choiceCollection = client.useDiscoverEditorsChoice().discoverEditorsChoice;

    if (!choiceCollection) {
        return null;
    }

    const getAvatar = (uuid: string) => {
        return `https://ucarecdn.com/${uuid}/-/format/auto/-/scale_crop/40x40/center/`;
    };

    return (
        <XView>
            {choiceCollection.map(i => (
                <UListItem
                    key={i.id}
                    title={i.chat.title}
                    leftElement={
                        <UAvatar
                            photo={i.chat.photo}
                            title={i.chat.title}
                            id={i.chat.id}
                            size="medium"
                        />
                    }
                    avatar={{ photo: getAvatar(i.image.uuid), title: i.chat.title, id: i.id }}
                    onClick={() => null}
                    rightElement={
                        <XView flexDirection="row">
                            <UButton
                                text="Delete"
                                style="danger"
                                size="small"
                                onClick={() => showDeleteChoiceModal(i.id)}
                            />
                            <UButton
                                text="Edit"
                                size="small"
                                onClick={() => showEditChoiceModal(i)}
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
        <DevToolsScaffold title="Edit choice">
            <XView flexDirection="row" justifyContent="flex-end">
                <UButton text="Create new" onClick={() => showEditChoiceModal()} />
            </XView>
            <ChoiceFragment />
        </DevToolsScaffold>
    );
});
