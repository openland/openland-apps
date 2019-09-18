import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { SharedRoomKind } from 'openland-api/Types';
import { XLoader } from 'openland-x/XLoader';
import BackIcon from 'openland-icons/ic-back-create-room.svg';
import { CoverUpload } from '../../pages/main/mail/CoverUpload';
import { useClient } from 'openland-web/utils/useClient';
import { OrganizationsList } from '../../pages/main/mail/OrganizationsList';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import {
    SelectWithDropdown,
    SelectWithDropdownOption,
} from '../../pages/main/mail/SelectWithDropdown';
import { XTextArea } from 'openland-x/XTextArea';
import { XModalController } from 'openland-x/showModal';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { ExplorePeople } from 'openland-web/fragments/create/ExplorePeople';
import { SearchBox } from 'openland-web/fragments/create/SearchBox';

export enum EntityKind {
    GROUP = 'GROUP',
    CHANNEL = 'CHANNEL',
    COMMUNITY = 'COMMUNITY',
    ORGANIZATION = 'ORGANIZATION',
}

export enum CommunityType {
    COMMUNITY_PUBLIC = 'COMMUNITY_PUBLIC',
    COMMUNITY_PRIVATE = 'COMMUNITY_PRIVATE',
}

export const isDialog = (entityKind: EntityKind) => {
    return entityKind === EntityKind.CHANNEL || entityKind === EntityKind.GROUP;
};

type MainWrapperT = {
    back: boolean;
    onBackClick: () => void;
    children: any;
};

const MainWrapper = ({ back, onBackClick, children }: MainWrapperT) => {
    return (
        <XView
            flexGrow={1}
            flexDirection="column"
            backgroundColor="#fff"
            maxHeight="100vh"
            width="100%"
        >
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent={back ? 'space-between' : 'flex-end'}
                marginBottom={30}
                padding={20}
            >
                {back && (
                    <XView
                        onClick={onBackClick}
                        flexDirection="row"
                        cursor="pointer"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                    >
                        <XView marginRight={3} flexDirection="row" alignItems="center">
                            <BackIcon />
                        </XView>
                        <span>Back</span>
                    </XView>
                )}
            </XView>
            <XView
                flexDirection="row"
                justifyContent="center"
                flexGrow={1}
                overflow="hidden"
                maxHeight="calc(100% - 102px)"
            >
                <XView maxWidth={500} flexGrow={1} flexShrink={0} paddingHorizontal={20}>
                    {children}
                </XView>
            </XView>
        </XView>
    );
};

type AddMembersT = {
    onSkip: (event: React.MouseEvent) => void;
    onSubmit: (users: Map<string, string> | null) => void;
};

const AddMembers = React.memo(({ onSkip, onSubmit }: AddMembersT) => {
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const onSearchPeopleInputChange = (data: string) => {
        setSearchPeopleQuery(data);
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
        setSelectedUsers(newSelected);
        setOptions(newOpts);
    };

    const selectMembers = (label: string, value: string) => {
        const selected = selectedUsers || new Map();
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
        setSelectedUsers(selected);
        setOptions(newOpts);
    };

    return (
        <XView flexGrow={1} flexShrink={0} flexDirection="column" maxHeight="100%">
            <XView
                flexShrink={0}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={40}
                paddingHorizontal={16}
            >
                <XView fontSize={32} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                    Add people
                </XView>
                <XView flexShrink={0} flexDirection="row" alignItems="center">
                    <UButton text="Skip" style="secondary" onClick={onSkip} marginRight={12} />
                    <UButton
                        text="Add"
                        onClick={!!options.length ? () => onSubmit(selectedUsers) : undefined}
                        disable={!options.length}
                    />
                </XView>
            </XView>
            <XView paddingHorizontal={16} flexShrink={0}>
                <SearchBox
                    onInputChange={onSearchPeopleInputChange}
                    value={options}
                    onChange={onChange}
                />
            </XView>
            <React.Suspense
                fallback={
                    <XView flexGrow={1} flexShrink={0}>
                        <XLoader loading={true} />
                    </XView>
                }
            >
                <XView flexGrow={1} flexShrink={1} marginHorizontal={-12} overflow="hidden">
                    <ExplorePeople
                        excludeMe={true}
                        query={searchPeopleQuery}
                        onPick={selectMembers}
                        selectedUsers={selectedUsers}
                    />
                </XView>
            </React.Suspense>
        </XView>
    );
});

interface CreateEntityProps {
    myId?: string;
    myOrgId?: string;
    inOrgId?: string;
    entityKind: EntityKind;
    selectOptions?: SelectWithDropdownOption<CommunityType | SharedRoomKind>[];
    ctx: XModalController;
}

export const CreateEntity = ({
    myId,
    myOrgId,
    entityKind,
    inOrgId,
    selectOptions,
    ctx,
}: CreateEntityProps) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext);
    const [title, setTitle] = React.useState<string>('');
    const [coverSrc, setCoverSrc] = React.useState<string | null>('');
    const [settingsPage, setSettingsPage] = React.useState(true);

    let chatTypeStr = entityKind.charAt(0).toUpperCase() + entityKind.slice(1).toLowerCase();

    let form = useForm();
    let typeField = useField<SharedRoomKind | CommunityType>(
        'input.type',
        isDialog(entityKind)
            ? inOrgId
                ? SharedRoomKind.PUBLIC
                : SharedRoomKind.GROUP
            : CommunityType.COMMUNITY_PUBLIC,
        form,
    );

    let aboutField = useField<string>('input.type', '', form);

    let selectedOrgField = useField<string | null>(
        'input.selectedOrg',
        inOrgId ? inOrgId : null,
        form,
    );

    const doSubmit = async ({ membersToAdd }: { membersToAdd: string[] }) => {
        let photoRef: { uuid: string } | null = null;
        if (coverSrc) {
            photoRef = {
                uuid: coverSrc,
            };
        }

        if (typeField.value === SharedRoomKind.GROUP || typeField.value === SharedRoomKind.PUBLIC) {
            const group = (await client.mutateRoomCreate({
                title: title.trim(),
                kind: typeField.value,
                photoRef,
                members: membersToAdd,
                organizationId: selectedOrgField.value ? selectedOrgField.value : myOrgId || '',
                channel: entityKind === EntityKind.CHANNEL,
            })).room;

            if (router) {
                router.navigate('/mail/' + group.id);
            }

            ctx.hide();
        } else {
            const isCommunity = entityKind === EntityKind.COMMUNITY;
            const organization = (await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: title.trim(),
                    about: aboutField.value,
                    photoRef,
                    isCommunity,
                    isPrivate: typeField.value === CommunityType.COMMUNITY_PRIVATE,
                },
            })).organization;

            if (membersToAdd.length) {
                await client.mutateOrganizationAddMember({
                    organizationId: organization.id,
                    userIds: membersToAdd,
                });
            }

            await client.refetchAccount();

            if (router) {
                router.navigate('/' + organization.id);
            }

            ctx.hide();
        }
    };

    const onSubmit = (users: Map<string, string> | null) =>
        form.doAction(async () => {
            let membersIds: string[] = [];
            if (myId) {
                membersIds.push(myId);
            }

            if (users) {
                users.forEach((l, v) => {
                    membersIds.push(v);
                });
            }

            await doSubmit({
                membersToAdd: membersIds,
            });
        });

    const onSkip = () =>
        form.doAction(async () => {
            if (myId) {
                await doSubmit({
                    membersToAdd: [myId],
                });
            } else {
                await doSubmit({
                    membersToAdd: [],
                });
            }
        });

    const handleChatTypeChange = (data: SharedRoomKind) => {
        if (data === SharedRoomKind.GROUP && !inOrgId) {
            selectedOrgField.input.onChange(null);
        }
        selectedOrgField.input.onChange(inOrgId ? inOrgId : null);
        typeField.input.onChange(data);
    };

    const onNext = async () => {
        await form.doAction(() => {
            //
        });

        if (!title.trim()) {
            return;
        }

        if (typeField.value) {
            setSettingsPage(false);
        } else {
            setSettingsPage(true);
        }
    };

    const handleBackClick = () => {
        setSettingsPage(true);
    };

    return (
        <MainWrapper back={!settingsPage} onBackClick={handleBackClick}>
            {settingsPage && (
                <XView flexGrow={1} flexShrink={0} flexDirection="column" maxHeight="100%">
                    <XView
                        flexShrink={0}
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom={40}
                        paddingHorizontal={16}
                    >
                        <XView fontSize={32} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                            {`New ${chatTypeStr.toLocaleLowerCase()}`}
                        </XView>
                        <UButton
                            text="Next"
                            onClick={!!title.trim() ? onNext : undefined}
                            disable={!title.trim()}
                        />
                    </XView>
                    <XView flexShrink={0} flexDirection="row" paddingHorizontal={16}>
                        <CoverUpload value={coverSrc} onChange={setCoverSrc} />
                        <XView flexGrow={1} flexShrink={0} flexDirection="column" marginLeft={20}>
                            <UInput
                                flexGrow={1}
                                flexShrink={0}
                                marginBottom={16}
                                label={`${chatTypeStr} name`}
                                value={title}
                                onChange={setTitle}
                            />

                            {selectOptions &&
                                entityKind !== EntityKind.ORGANIZATION && (
                                    <SelectWithDropdown
                                        title={`${chatTypeStr} type`}
                                        value={typeField.value}
                                        onChange={handleChatTypeChange}
                                        selectOptions={selectOptions}
                                    />
                                )}
                            {entityKind === EntityKind.ORGANIZATION && (
                                <XView flexGrow={1} flexDirection="row">
                                    <XTextArea
                                        flexGrow={1}
                                        height={140}
                                        resize={false}
                                        title="Short description"
                                        mode="modern"
                                        {...aboutField.input}
                                    />
                                </XView>
                            )}
                        </XView>
                    </XView>

                    {entityKind === EntityKind.COMMUNITY && (
                        <XView
                            marginTop={16}
                            flexGrow={1}
                            flexDirection="row"
                            paddingHorizontal={16}
                        >
                            <XTextArea
                                flexGrow={1}
                                height={140}
                                resize={false}
                                title="Short description"
                                mode="modern"
                                {...aboutField.input}
                            />
                        </XView>
                    )}

                    {typeField.value === SharedRoomKind.PUBLIC && (
                        <OrganizationsList {...selectedOrgField.input} inOrgId={inOrgId} />
                    )}
                </XView>
            )}
            {!settingsPage && <AddMembers onSkip={onSkip} onSubmit={onSubmit} />}
        </MainWrapper>
    );
};
