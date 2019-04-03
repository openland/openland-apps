import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../../../config';
import { MyOrganizationsQuery } from 'openland-api';
import { MyOrganizations_myOrganizations, SharedRoomKind } from 'openland-api/Types';
import { withCreateChannel } from 'openland-web/api/withCreateChannel';
import { withExplorePeople } from 'openland-web/api/withExplorePeople';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { UserInfoContext, withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModal, XModalBody, XModalFooter } from 'openland-x-modal/XModal';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XMutation } from 'openland-x/XMutation';
import { XInput } from 'openland-x/XInput';
import { XSelect } from 'openland-x/XSelect';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XAvatar } from 'openland-x/XAvatar';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import BackIcon from 'openland-icons/ic-back-create-room.svg';
import AddPhotoIcon from 'openland-icons/ic-photo-create-room.svg';
import CheckIcon from 'openland-icons/check-form.svg';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { Query } from 'react-apollo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

interface CreateRoomButtonProps {
    title: string;
    kind: SharedRoomKind;
    members: string[];
    organizationId: string | null;
    imageUuid: string | null;
    isChannel: boolean;
}

const CreateRoomButton = withCreateChannel(props => {
    const typedProps = props as typeof props & CreateRoomButtonProps;
    let photoRef: { uuid: string } | null;
    if ((props as any).imageUuid) {
        photoRef = {
            uuid: (props as any).imageUuid,
        };
    }
    let res = props.createChannel;
    return (
        <XMutation
            action={async () => {
                await res({
                    variables: {
                        title: typedProps.title,
                        kind: typedProps.kind,
                        members: [...typedProps.members],
                        organizationId: typedProps.organizationId || '',
                        photoRef: photoRef,
                        channel: (props as any).isChannel,
                    },
                }).then((data: any) => {
                    const roomId: string = data.data.room.id as string;
                    props.router.replace('/mail/' + roomId);
                });
            }}
        >
            {props.children}
        </XMutation>
    );
}) as React.ComponentType<CreateRoomButtonProps>;

const MainWrapper = (props: {
    back: boolean;
    onBackClick: () => void;
    children: any;
    isChannel: boolean;
}) => {
    let chatTypeStr = props.isChannel ? 'channel' : 'group';
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
                justifyContent={props.back ? 'space-between' : 'flex-end'}
                marginBottom={30}
                padding={20}
            >
                {props.back && (
                    <XView
                        onClick={props.onBackClick}
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
            </XView>
            <XView
                flexDirection="row"
                justifyContent="center"
                flexGrow={1}
                overflow="hidden"
                maxHeight="calc(100% - 102px)"
            >
                <XView maxWidth={500} flexGrow={1} flexShrink={0} paddingHorizontal={20}>
                    {props.children}
                </XView>
            </XView>
        </XView>
    );
};

const CoverWrapperClassName = css`
    width: 120px;
    height: 120px;
    border-radius: 62px;
    background-color: #f2f3f4;
    color: #696c6e;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
        & .edit-photo {
            opacity: 1;
            color: #fff;
        }
        & svg path {
            fill: #fff;
        }
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.4;
            background-color: #000000;
            content: '';
            z-index: 0;
        }
    }
`;

const AddPhotoClassName = css`
    position: absolute;
    top: calc(50% - 24px);
    left: calc(50% - 32px);
    pointer-events: none;
    font-size: 14px;
    line-height: 1.29;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    & span {
        display: block;
        margin-top: 9px;
    }
`;

const EditPhotoClassName = css`
    opacity: 0;
`;

const CoverImgClassName = css`
    width: 100%;
    height: 100%;
    display: block;
`;

interface CoverUploadProps {
    src: string | null;
    onClick: () => void;
    coverUploading: boolean;
}

const CoverUpload = (props: CoverUploadProps) => {
    const { src, coverUploading, onClick } = props;
    return (
        <div className={CoverWrapperClassName} onClick={onClick}>
            {coverUploading && <XLoadingCircular color="#373754" />}
            {!coverUploading && (
                <>
                    {src && (
                        <>
                            <img
                                className={CoverImgClassName}
                                src={
                                    'https://ucarecdn.com/' +
                                    src +
                                    '/-/format/jpeg/-/scale_crop/200x200/center/-/progressive/yes/'
                                }
                            />
                            <div
                                className={`${cx(
                                    AddPhotoClassName,
                                    EditPhotoClassName,
                                )} edit-photo`}
                            >
                                <AddPhotoIcon />
                                <span>Edit photo</span>
                            </div>
                        </>
                    )}
                    {!src && (
                        <div className={`${AddPhotoClassName} edit-photo`}>
                            <AddPhotoIcon />
                            <span>Add photo</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

interface OrganizationItemProps {
    organization: MyOrganizations_myOrganizations;
    onSelect: (v: string) => void;
    isSelected: boolean;
}

const CheckIconClassName = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #1790ff;
`;

const OrganizationItem = (props: OrganizationItemProps) => {
    const { isSelected, organization } = props;
    return (
        <XView
            cursor="pointer"
            flexShrink={0}
            flexDirection="row"
            alignItems="center"
            paddingLeft={16}
            paddingRight={20}
            paddingVertical={8}
            borderRadius={8}
            backgroundColor={isSelected ? '#F5F5F6' : '#fff'}
            hoverBackgroundColor="#F5F5F6"
            onClick={() => props.onSelect(organization.id)}
        >
            <XAvatar
                src={organization.photo || undefined}
                objectName={organization.name}
                objectId={organization.id}
                style="colorus"
            />
            <XView flexDirection="column" flexGrow={1} marginLeft={16}>
                <XView fontSize={15} fontWeight="600">
                    {organization.name}
                </XView>
                <XView fontSize={14} color="rgba(0, 0, 0, 0.6)">
                    {organization.isCommunity ? 'Community' : 'Organization'}
                </XView>
            </XView>
            {isSelected && (
                <div className={CheckIconClassName}>
                    <CheckIcon />
                </div>
            )}
        </XView>
    );
};

const SelectOrganizationWrapperClassName = css`
    display: flex;
    position: relative;
    flex-grow: 0;
    flex-shrink: 1;
    flex-direction: column;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
`;

const OrganizationsList = (props: {
    organizations?: MyOrganizations_myOrganizations[];
    onSelect: (v: string) => void;
    selectedOrg: string | null;
}) => {
    if (!props.organizations) {
        return (
            <XView
                flexShrink={0}
                flexGrow={1}
                flexDirection="column"
                justifyContent="center"
                marginTop={40}
            >
                <XLoader loading={true} height={40} />
            </XView>
        );
    }

    const userContext = React.useContext(UserInfoContext);
    let primaryOrganizationId = '';
    if (userContext && userContext.organization) {
        primaryOrganizationId = userContext.organization.id;
    }

    return (
        <XView flexShrink={1} flexGrow={1} flexDirection="column">
            <XView fontSize={18} fontWeight="600" marginBottom={20} marginTop={40} paddingLeft={16}>
                Share with
            </XView>
            <div className={SelectOrganizationWrapperClassName}>
                {props.organizations
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(i => (
                        <OrganizationItem
                            organization={i}
                            key={'org_' + i.id}
                            onSelect={props.onSelect}
                            isSelected={
                                props.selectedOrg
                                    ? props.selectedOrg === i.id
                                    : primaryOrganizationId === i.id
                            }
                        />
                    ))}
            </div>
        </XView>
    );
};

interface SearchPeopleBoxProps {
    value: { label: string; value: string }[] | null;
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

const SearchPeopleBox = (props: SearchPeopleBoxProps) => (
    <XSelect
        multi={true}
        render={
            <XSelectCustomUsersRender
                popper={false}
                placeholder="Search"
                onInputChange={props.onInputChange}
                onChange={data => props.onChange(data as any)}
                options={props.value || []}
                value={props.value || []}
            />
        }
    />
);

interface ExplorePeopleProps {
    variables: { query?: string };
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
    onPick: (label: string, value: string) => void;
}

const UsersPickerWrapperClassName = css`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    margin-top: 16px;
    overflow: scroll;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
`;

const ExplorePeople = withExplorePeople(props => {
    if (!props.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    return (
        <XView flexGrow={1} flexShrink={1} paddingHorizontal={16} marginTop={16} overflow="hidden">
            <div className={UsersPickerWrapperClassName}>
                {props.data.items.edges.map(i => {
                    if (
                        (props as any).selectedUsers &&
                        (props as any).selectedUsers.has(i.node.id)
                    ) {
                        return null;
                    }
                    return (
                        <XView
                            key={i.node.id}
                            flexShrink={0}
                            onClick={() => (props as any).onPick(i.node.name, i.node.id)}
                        >
                            <XUserCard user={i.node} noPath={true} customButton={null} />
                        </XView>
                    );
                })}
            </div>
        </XView>
    );
}) as React.ComponentType<ExplorePeopleProps>;

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

interface CreateGroupInnerProps {
    myId: string;
    myOrgId: string;
    isChannel: boolean;
}

interface CreateGroupInnerState {
    settingsPage: boolean;
    title: string;
    titleError: boolean;
    type: SharedRoomKind;
    coverSrc: string | null;
    coverUploading: boolean;
    selectedOrg: string | null;
    searchPeopleQuery: string;
    selectedUsers: Map<string, string> | null;
}

class CreateGroupInner extends React.Component<CreateGroupInnerProps, CreateGroupInnerState> {
    constructor(props: CreateGroupInnerProps) {
        super(props);

        this.state = {
            settingsPage: true,
            title: '',
            titleError: false,
            type: SharedRoomKind.GROUP,
            coverSrc: '',
            coverUploading: false,
            selectedOrg: null,
            searchPeopleQuery: '',
            selectedUsers: null,
        };
    }

    handleTitleChange = (data: string) => {
        this.setState({
            title: data,
            titleError: false,
        });
    };

    handleChatTypeChange = (data: SharedRoomKind) => {
        if (data === SharedRoomKind.GROUP) {
            this.setState({
                selectedOrg: null,
            });
        }
        this.setState({
            type: data,
        });
    };

    handleSetCover = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(res => {
            res.progress(r => {
                this.setState({
                    coverSrc: '',
                    coverUploading: true,
                });
            });
            res.done(r => {
                this.setState({
                    coverSrc: r.uuid,
                    coverUploading: false,
                });
            });
        });
    };

    onOrganizationSelect = (v: string) => {
        this.setState({
            selectedOrg: v,
        });
    };

    handleAddMembers = () => {
        if (this.state.title) {
            this.setState({
                settingsPage: false,
            });
        } else {
            this.setState({
                titleError: true,
            });
        }
    };

    handleBackClick = () => {
        this.setState({
            settingsPage: true,
            searchPeopleQuery: '',
            selectedUsers: null,
        });
    };

    onSearchPeopleInputChange = (data: string) => {
        this.setState({
            searchPeopleQuery: data,
        });
        return data;
    };

    handleSearchPeopleInputChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        this.setState({
            selectedUsers: newSelected,
        });
    };

    selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    };

    render() {
        const {
            settingsPage,
            title,
            titleError,
            type,
            coverSrc,
            coverUploading,
            selectedOrg,
            searchPeopleQuery,
            selectedUsers,
        } = this.state;

        const { myId, myOrgId, isChannel } = this.props;

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
            <MainWrapper
                back={!settingsPage}
                onBackClick={this.handleBackClick}
                isChannel={this.props.isChannel}
            >
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
                            <XButton style="primary" text="Next" onClick={this.handleAddMembers} />
                        </XView>
                        <XView flexShrink={0} flexDirection="row" paddingHorizontal={16}>
                            <CoverUpload
                                src={coverSrc}
                                coverUploading={coverUploading}
                                onClick={this.handleSetCover}
                            />
                            <XView
                                flexGrow={1}
                                flexShrink={0}
                                flexDirection="column"
                                marginLeft={20}
                            >
                                <XView flexGrow={1} flexShrink={0} marginBottom={16}>
                                    <XInput
                                        title={`${chatTypeStr} name`}
                                        onChange={this.handleTitleChange}
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
                                    <XSelect
                                        searchable={false}
                                        clearable={false}
                                        withSubtitle={true}
                                        value={type}
                                        onChange={value =>
                                            this.handleChatTypeChange((value as any).value)
                                        }
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
                                                {type === SharedRoomKind.GROUP
                                                    ? 'Secret'
                                                    : 'Shared'}
                                            </XView>
                                        </XView>
                                        <ArrowIcon />
                                    </XView>
                                </div>
                            </XView>
                        </XView>
                        {type === SharedRoomKind.PUBLIC && (
                            <Query query={MyOrganizationsQuery.document}>
                                {data => (
                                    <OrganizationsList
                                        onSelect={this.onOrganizationSelect}
                                        selectedOrg={selectedOrg}
                                        organizations={
                                            data.data && data.data.myOrganizations
                                                ? data.data.myOrganizations
                                                : undefined
                                        }
                                    />
                                )}
                            </Query>
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
                                onInputChange={this.onSearchPeopleInputChange}
                                value={options}
                                onChange={this.handleSearchPeopleInputChange}
                            />
                        </XView>
                        <ExplorePeople
                            variables={{ query: searchPeopleQuery }}
                            searchQuery={searchPeopleQuery}
                            onPick={this.selectMembers}
                            selectedUsers={selectedUsers}
                        />
                    </XView>
                )}
            </MainWrapper>
        );
    }
}

export default withApp(
    'Create Room',
    'viewer',
    withUserInfo(props => {
        const router = React.useContext(XRouterContext) as XRouter;

        return (
            <>
                <XDocumentHead title="Create Room" />
                <CreateGroupInner
                    myId={props.user ? props.user.id : ''}
                    myOrgId={props.organization ? props.organization.id : ''}
                    isChannel={router.routeQuery.channel === 'true'}
                />
            </>
        );
    }),
);
