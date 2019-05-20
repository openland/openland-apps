import * as React from 'react';
import { XView } from 'react-mental';
import { SharedRoomKind } from 'openland-api/Types';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import BackIcon from 'openland-icons/ic-back-create-room.svg';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { CoverUpload } from './CoverUpload';
import { ExplorePeople } from './ExplorePeople';
import { SearchPeopleBox } from './SearchPeopleBox';
import { useClient } from 'openland-web/utils/useClient';
import { OrganizationsList } from './OrganizationsList';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SelectWithDropdown } from './SelectWithDropdown';
import { LeaveAndDeleteModal } from './LeaveAndDeleteModal';
import { InputField } from './InputField';

enum EntityKind {
    GROUP = 'GROUP',
    CHANNEL = 'CHANNEL',
    COMMUNITY = 'COMMUNITY',
}

type MainWrapperT = {
    back: boolean;
    onBackClick: () => void;
    children: any;
    entityKind: EntityKind;
};

const MainWrapper = ({ entityKind, back, onBackClick, children }: MainWrapperT) => {
    let chatTypeStr = entityKind.toLowerCase();
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
                <LeaveAndDeleteModal chatTypeStr={chatTypeStr} />
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
    onSubmit: (event: React.MouseEvent) => void;
    onSearchPeopleInputChange: (data: string) => string;
    options: { label: string; value: string }[];
    handleSearchPeopleInputChange: (data: { label: string; value: string }[] | null) => void;
    searchPeopleQuery: string;
    selectMembers: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
};

const AddMembers = ({
    onSkip,
    onSubmit,
    onSearchPeopleInputChange,
    options,
    handleSearchPeopleInputChange,
    searchPeopleQuery,
    selectMembers,
    selectedUsers,
}: AddMembersT) => {
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
                    Add members
                </XView>
                <XView flexShrink={0} flexDirection="row" alignItems="center">
                    <XView flexShrink={0} flexDirection="row" alignItems="center" marginRight={12}>
                        <XButton style="ghost" text="Skip" onClick={onSkip} />
                    </XView>

                    <XButton style="primary" text="Add" onClick={onSubmit} />
                </XView>
            </XView>
            <XView paddingHorizontal={16} flexShrink={0}>
                <SearchPeopleBox
                    onInputChange={onSearchPeopleInputChange}
                    value={options}
                    onChange={handleSearchPeopleInputChange}
                />
            </XView>
            <React.Suspense
                fallback={
                    <XView flexGrow={1} flexShrink={0}>
                        <XLoader loading={true} />
                    </XView>
                }
            >
                <ExplorePeople
                    variables={{ query: searchPeopleQuery }}
                    searchQuery={searchPeopleQuery}
                    onPick={selectMembers}
                    selectedUsers={selectedUsers}
                />
            </React.Suspense>
        </XView>
    );
};

interface CreateGroupInnerProps {
    myId: string;
    myOrgId: string;
    inOrgId?: string;
    entityKind: EntityKind;
}

const CreateGroupInner = ({ myId, myOrgId, entityKind, inOrgId }: CreateGroupInnerProps) => {
    const [coverSrc, setCoverSrc] = React.useState<string | null>('');
    const [settingsPage, setSettingsPage] = React.useState(true);
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);
    let options: { label: string; value: string }[] = [];

    let chatTypeStr = entityKind.charAt(0).toUpperCase() + entityKind.slice(1).toLowerCase();

    let form = useForm();
    let titleField = useField('input.title', '', form, [
        {
            checkIsValid: value => !!value,
            text: `Please enter a name for this ${chatTypeStr.toLocaleLowerCase()}`,
        },
    ]);
    let typeField = useField<SharedRoomKind>(
        'input.type',
        inOrgId ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP,
        form,
    );

    let selectedOrgField = useField<string | null>(
        'input.selectedOrg',
        inOrgId ? inOrgId : null,
        form,
    );

    const doSubmit = async ({ membersToAdd }: { membersToAdd: string[] }) => {
        const client = useClient();
        let router = React.useContext(XRouterContext)!;

        let photoRef: { uuid: string } | null = null;
        if (coverSrc) {
            photoRef = {
                uuid: coverSrc,
            };
        }

        const returnedData = await client.mutateRoomCreate({
            title: titleField.value,
            kind: typeField.value,
            photoRef,
            members: membersToAdd,
            organizationId: selectedOrgField.value ? selectedOrgField.value : myOrgId || '',
            channel: entityKind === EntityKind.CHANNEL,
        });

        const roomId: string = returnedData.room.id as string;
        router.replace('/mail/' + roomId);
    };

    const onSubmit = React.useCallback(() => {
        form.doAction(async () => {
            let membersIds: string[] = [myId];

            if (selectedUsers) {
                selectedUsers.forEach((l, v) => {
                    options.push({
                        label: l,
                        value: v,
                    });

                    membersIds.push(v);
                });
            }

            await doSubmit({
                membersToAdd: membersIds,
            });
        });
    }, []);

    const onSkip = React.useCallback(() => {
        form.doAction(async () => {
            await doSubmit({
                membersToAdd: [myId],
            });
        });
    }, []);

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

        if (titleField.input.errorText) {
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
        setSearchPeopleQuery('');
        setSelectedUsers(null);
    };

    const onSearchPeopleInputChange = (data: string) => {
        setSearchPeopleQuery(data);
        return data;
    };

    const handleSearchPeopleInputChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        setSelectedUsers(newSelected);
    };

    const selectMembers = (label: string, value: string) => {
        let selected = selectedUsers || new Map();

        selected.set(value, label);

        setSelectedUsers(selected);
    };

    return (
        <MainWrapper back={!settingsPage} onBackClick={handleBackClick} entityKind={entityKind}>
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
                        <XButton style="primary" text="Next" onClick={onNext} />
                    </XView>
                    <XView flexShrink={0} flexDirection="row" paddingHorizontal={16}>
                        <CoverUpload onCoverSelect={setCoverSrc} />
                        <XView flexGrow={1} flexShrink={0} flexDirection="column" marginLeft={20}>
                            <XView flexGrow={1} flexShrink={0} marginBottom={16}>
                                <InputField field={titleField} title={`${chatTypeStr} name`} />
                            </XView>

                            <SelectWithDropdown
                                title={`${chatTypeStr} type`}
                                value={typeField.value}
                                onChange={handleChatTypeChange}
                                selectOptions={[
                                    {
                                        value: SharedRoomKind.GROUP,
                                        label: `Secret ${chatTypeStr.toLocaleLowerCase()}`,
                                        labelShort: 'Secret',
                                        subtitle: `People can view and join only by invite from a ${chatTypeStr.toLocaleLowerCase()} member`,
                                    },
                                    {
                                        value: SharedRoomKind.PUBLIC,
                                        label: `Shared ${chatTypeStr.toLocaleLowerCase()}`,
                                        labelShort: 'Shared',
                                        subtitle: `${chatTypeStr} where your organization or community members communicate`,
                                    },
                                ]}
                            />
                        </XView>
                    </XView>
                    {typeField.value === SharedRoomKind.PUBLIC && (
                        <OrganizationsList {...selectedOrgField.input} inOrgId={inOrgId} />
                    )}
                </XView>
            )}
            {!settingsPage && (
                <AddMembers
                    onSkip={onSkip}
                    onSubmit={onSubmit}
                    onSearchPeopleInputChange={onSearchPeopleInputChange}
                    options={options}
                    handleSearchPeopleInputChange={handleSearchPeopleInputChange}
                    searchPeopleQuery={searchPeopleQuery}
                    selectMembers={selectMembers}
                    selectedUsers={selectedUsers}
                />
            )}
        </MainWrapper>
    );
};

export default withApp(
    'Create Room',
    'viewer',
    withUserInfo(props => {
        const router = React.useContext(XRouterContext) as XRouter;
        const { routeQuery } = router;
        const isChannel = routeQuery.channel || routeQuery.orgchannel;
        const inOrganization = routeQuery.orgchannel || routeQuery.org;
        return (
            <>
                <XDocumentHead title="Create Room" />
                <CreateGroupInner
                    myId={props.user ? props.user.id : ''}
                    myOrgId={props.organization ? props.organization.id : ''}
                    inOrgId={inOrganization}
                    entityKind={isChannel !== undefined ? EntityKind.CHANNEL : EntityKind.GROUP}
                />
            </>
        );
    }),
);
