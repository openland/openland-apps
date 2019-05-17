import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../../../config';
import { SharedRoomKind } from 'openland-api/Types';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XModal, XModalBody, XModalFooter } from 'openland-x-modal/XModal';
import { XInput } from 'openland-x/XInput';
import { XSelect } from 'openland-x/XSelect';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import BackIcon from 'openland-icons/ic-back-create-room.svg';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { CoverUpload } from './CoverUpload';
import { ExplorePeople } from './ExplorePeople';
import { SearchPeopleBox } from './SearchPeopleBox';
import { CreateRoomButton } from './CreateRoomButton';
import { OrganizationsList } from './OrganizationsList';

const LeaveAndDeleteModal = ({ chatTypeStr }: { chatTypeStr: string }) => {
    return (
        <XModal
            title={`Leave and delete ${chatTypeStr}`}
            width={380}
            body={
                <XModalBody>
                    <XView paddingBottom={30}>
                        {`If you leave now, this ${chatTypeStr} will be deleted.`}
                    </XView>
                </XModalBody>
            }
            footer={
                <XModalFooter>
                    <XButton text="Cancel" style="primary" autoClose={true} />
                    <XView width={12} flexShrink={0} />
                    <XButton text="Leave and delete" style="ghost" path="/mail" />
                </XModalFooter>
            }
            target={
                <XView
                    cursor="pointer"
                    alignItems="center"
                    justifyContent="center"
                    padding={8}
                    width={32}
                    height={32}
                    borderRadius={50}
                    hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                >
                    <CloseIcon />
                </XView>
            }
        />
    );
};

const MainWrapper = ({
    isChannel,
    back,
    onBackClick,
    children,
}: {
    back: boolean;
    onBackClick: () => void;
    children: any;
    isChannel: boolean;
}) => {
    let chatTypeStr = isChannel ? 'channel' : 'group';
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

const InputStyledClassName = css`
    height: 52px !important;
    border-radius: 8px !important;
    background-color: #f2f3f4 !important;
    border-color: transparent !important;
    &:focus-within {
        border-color: transparent !important;
        border-bottom: 1px solid #1790ff !important;
        box-shadow: none !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        & .input-placeholder {
            color: #1488f3 !important;
        }
    }
    & input {
        padding-top: 11px !important;
    }
    & .input-placeholder {
        top: -11px !important;
        left: 0 !important;
        background-color: transparent !important;
        color: #696c6e !important;
        padding-left: 16px !important;
        height: 100% !important;
        width: 100% !important;
        font-size: 12px !important;
        font-weight: normal !important;
        font-style: normal !important;
        font-stretch: normal !important;
        line-height: normal !important;
        pointer-events: none !important;
        display: flex !important;
        align-items: center !important;
    }
`;

const InputValueStyledClassName = css`
    & .input-placeholder {
        color: #1488f3 !important;
    }
`;

const InputInvalidStyledClassName = css`
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-color: transparent !important;
    border-bottom: 1px solid #d75454 !important;
    & .input-placeholder {
        color: #d75454 !important;
    }
`;

const SelectGroupTypeClassName = css`
    position: relative;
    cursor: pointer;
    & .Select-control > *,
    & .Select-control > *:focus,
    & .Select-control > *:active {
        box-shadow: none !important;
        border: none !important;
        cursor: pointer !important;
    }
    & > .x {
        position: absolute;
        width: 100%;
        top: 0px;
        pointer-events: none;
        cursor: pointer !important;
    }
    & .Select-control {
        height: 52px !important;
        opacity: 0;
    }
`;

const GroupTypeSelect = ({
    value,
    onChange,
    chatTypeStr,
}: {
    value: any;
    onChange: any;
    chatTypeStr: string;
}) => {
    return (
        <>
            <XSelect
                searchable={false}
                clearable={false}
                withSubtitle={true}
                value={value}
                onChange={onChange}
                options={[
                    {
                        value: SharedRoomKind.GROUP,
                        label: `Secret ${chatTypeStr.toLocaleLowerCase()}`,
                        subtitle: `People can view and join only by invite from a ${chatTypeStr.toLocaleLowerCase()} member`,
                    },
                    {
                        value: SharedRoomKind.PUBLIC,
                        label: `Shared ${chatTypeStr.toLocaleLowerCase()}`,
                        subtitle: `${chatTypeStr} where your organization or community members communicate`,
                    },
                ]}
            />
            <XView
                height={52}
                paddingHorizontal={16}
                backgroundColor="#f2f3f4"
                borderRadius={8}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <XView flexDirection="column" marginTop={-3}>
                    <XView color="#1488f3" fontSize={12}>
                        {`${chatTypeStr} type`}
                    </XView>
                    <XView fontSize={14} color="#000" marginTop={-4}>
                        {value === SharedRoomKind.GROUP ? 'Secret' : 'Shared'}
                    </XView>
                </XView>
                <ArrowIcon />
            </XView>
        </>
    );
};
interface CreateGroupInnerProps {
    myId: string;
    myOrgId: string;
    inOrgId?: string;
    isChannel: boolean;
}

const CreateGroupInner = ({ myId, myOrgId, isChannel, inOrgId }: CreateGroupInnerProps) => {
    const [settingsPage, setSettingsPage] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [titleError, setTitleError] = React.useState(false);
    const [type, setType] = React.useState<SharedRoomKind>(
        inOrgId ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP,
    );
    const [coverSrc, setCoverSrc] = React.useState<string | null>('');
    const [coverUploading, setCoverUploading] = React.useState(false);
    const [selectedOrg, setSelectedOrg] = React.useState<string | null>(inOrgId ? inOrgId : null);
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);

    const handleTitleChange = (data: string) => {
        setTitle(data);
        setTitleError(false);
    };

    const handleChatTypeChange = (data: SharedRoomKind) => {
        if (data === SharedRoomKind.GROUP && !inOrgId) {
            setSelectedOrg(null);
        }
        setSelectedOrg(inOrgId ? inOrgId : null);
        setType(data);
    };

    const handleSetCover = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(res => {
            res.progress(r => {
                setCoverSrc('');
                setCoverUploading(true);
            });
            res.done(r => {
                setCoverSrc(r.uuid);
                setCoverUploading(false);
            });
        });
    };

    const onOrganizationSelect = (v: string) => {
        setSelectedOrg(v);
    };

    const handleAddMembers = () => {
        if (title) {
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

    let chatTypeStr = isChannel ? 'Channel' : 'Group';

    let options: { label: string; value: string }[] = [];
    let membersIds: string[] = [];
    membersIds.push(myId);
    if (selectedUsers) {
        selectedUsers.forEach((l, v) => {
            options.push({
                label: l,
                value: v,
            });

            membersIds.push(v);
        });
    }
    return (
        <MainWrapper back={!settingsPage} onBackClick={handleBackClick} isChannel={isChannel}>
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
                        <XButton style="primary" text="Next" onClick={handleAddMembers} />
                    </XView>
                    <XView flexShrink={0} flexDirection="row" paddingHorizontal={16}>
                        <CoverUpload
                            src={coverSrc}
                            coverUploading={coverUploading}
                            onClick={handleSetCover}
                        />
                        <XView flexGrow={1} flexShrink={0} flexDirection="column" marginLeft={20}>
                            <XView flexGrow={1} flexShrink={0} marginBottom={16}>
                                <XInput
                                    title={`${chatTypeStr} name`}
                                    onChange={handleTitleChange}
                                    value={title}
                                    invalid={titleError}
                                    className={cx(
                                        InputStyledClassName,
                                        titleError && InputInvalidStyledClassName,
                                        title !== '' && InputValueStyledClassName,
                                    )}
                                />
                                {titleError && (
                                    <XView
                                        color="#d75454"
                                        paddingLeft={16}
                                        marginTop={8}
                                        fontSize={12}
                                    >
                                        {`Please enter a name for this ${chatTypeStr.toLocaleLowerCase()}`}
                                    </XView>
                                )}
                            </XView>
                            <div className={SelectGroupTypeClassName}>
                                <GroupTypeSelect
                                    value={type}
                                    chatTypeStr={chatTypeStr}
                                    onChange={(value: any) =>
                                        handleChatTypeChange((value as any).value)
                                    }
                                />
                            </div>
                        </XView>
                    </XView>
                    {type === SharedRoomKind.PUBLIC && (
                        <OrganizationsList
                            onSelect={onOrganizationSelect}
                            selectedOrg={selectedOrg}
                            inOrgId={inOrgId}
                        />
                    )}
                </XView>
            )}
            {!settingsPage && (
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
                            <XView
                                flexShrink={0}
                                flexDirection="row"
                                alignItems="center"
                                marginRight={12}
                            >
                                <CreateRoomButton
                                    title={title}
                                    kind={type}
                                    members={[myId]}
                                    organizationId={selectedOrg ? selectedOrg : myOrgId}
                                    imageUuid={coverSrc}
                                    isChannel={isChannel}
                                >
                                    <XButton style="ghost" text="Skip" />
                                </CreateRoomButton>
                            </XView>
                            <CreateRoomButton
                                title={title}
                                kind={type}
                                members={membersIds}
                                organizationId={selectedOrg ? selectedOrg : myOrgId}
                                imageUuid={coverSrc}
                                isChannel={isChannel}
                            >
                                <XButton style="primary" text="Add" />
                            </CreateRoomButton>
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
                    isChannel={isChannel !== undefined}
                />
            </>
        );
    }),
);
