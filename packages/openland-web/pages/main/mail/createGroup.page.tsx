import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../../../config';
import { MyOrganizations_myOrganizations, SharedRoomKind } from 'openland-api/Types';
import { withCreateChannel } from 'openland-web/api/withCreateChannel';
import { withExplorePeople } from 'openland-web/api/withExplorePeople';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
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
import { Query } from 'react-apollo';
import { MyOrganizationsQuery } from 'openland-api';

interface CreateRoomButtonProps {
    title: string;
    kind: SharedRoomKind;
    members: string[] | null;
    organizationId: string | null;
    imageUuid: string | null;
}

const CreateRoomButton = withCreateChannel(props => {
    let photoRef: { uuid: string } | null;
    if ((props as any).imageUuid) {
        photoRef = {
            uuid: (props as any).imageUuid,
        };
    }
    return (
        <XMutation
            action={async () => {
                await props.createChannel({
                    variables: {
                        title: (props as any).title,
                        kind: (props as any).kind,
                        members: [...(props as any).members],
                        organizationId: (props as any).organizationId || '',
                        photoRef: photoRef,
                    },
                });
            }}
            onSuccess={() => props.router.replace('/mail/')}
        >
            {props.children}
        </XMutation>
    );
}) as React.ComponentType<CreateRoomButtonProps>;

const CreateRoomButtonWithMembers = withCreateChannel(props => {
    let photoRef: { uuid: string } | null;
    if ((props as any).imageUuid) {
        photoRef = {
            uuid: (props as any).imageUuid,
        };
    }
    return (
        <XMutation
            action={async () => {
                await props.createChannel({
                    variables: {
                        title: (props as any).title,
                        kind: (props as any).kind,
                        members: [...(props as any).members],
                        organizationId: (props as any).organizationId || '',
                        photoRef: photoRef,
                    },
                });
            }}
            onSuccess={() => props.router.replace('/mail/')}
        >
            {props.children}
        </XMutation>
    );
}) as React.ComponentType<CreateRoomButtonProps>;

const MainWrapper = (props: { back: boolean; onBackClick: () => void; children: any }) => (
    <XView flexGrow={1} flexDirection="column" backgroundColor="#fff">
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
            <XView
                as="a"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                padding={8}
                width={32}
                height={32}
                borderRadius={50}
                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                path="/mail/"
            >
                <CloseIcon />
            </XView>
        </XView>
        <XView flexDirection="row" justifyContent="center">
            <XView
                maxWidth={500}
                flexGrow={1}
                flexShrink={0}
                paddingHorizontal={20}
                paddingBottom={20}
            >
                {props.children}
            </XView>
        </XView>
    </XView>
);

const CoverWrapperClassName = css`
    width: 120px;
    height: 120px;
    border-radius: 62px;
    background-color: #f2f3f4;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
        & .edit-photo {
            opacity: 1;
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

const EditPhotoClassName = css`
    position: absolute;
    top: calc(50% - 13px);
    left: calc(50% - 13px);
    pointer-events: none;
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
                                src={'https://ucarecdn.com/' + src + '/-/crop/200x200/center/'}
                            />
                            <div className={`${EditPhotoClassName} edit-photo`}>
                                <AddPhotoIcon />
                            </div>
                        </>
                    )}
                    {!src && (
                        <XView>
                            <AddPhotoIcon />
                        </XView>
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
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #1790ff;
    background-image: url(/static/img/icons/check-form.svg);
    background-size: 10px 8px;
    background-position: center 5px;
    background-repeat: no-repeat;
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
            {isSelected && <div className={CheckIconClassName} />}
        </XView>
    );
};

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

    return (
        <XView flexShrink={0} flexGrow={1} flexDirection="column" justifyContent="center">
            <XView fontSize={18} fontWeight="600" marginBottom={20} marginTop={40} paddingLeft={16}>
                Share with
            </XView>
            <XView flexDirection="column" flexShrink={0} flexGrow={1}>
                {props.organizations.sort((a, b) => a.name.localeCompare(b.name)).map(i => (
                    <OrganizationItem
                        organization={i}
                        key={'org_' + i.id}
                        onSelect={props.onSelect}
                        isSelected={props.selectedOrg ? props.selectedOrg === i.id : false}
                    />
                ))}
            </XView>
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
                rounded={true}
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

const ExplorePeople = withExplorePeople(props => {
    if (!props.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    return (
        <XView flexGrow={1} flexShrink={0}>
            <XView paddingHorizontal={16} flexDirection="column" flexShrink={0}>
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
            </XView>
        </XView>
    );
}) as React.ComponentType<ExplorePeopleProps>;

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

class CreateGroupInner extends React.Component<
    { myId: string; myOrgId: string },
    CreateGroupInnerState
> {
    constructor(props: { myId: string; myOrgId: string }) {
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

        const { myId, myOrgId } = this.props;

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
            <MainWrapper back={!settingsPage} onBackClick={this.handleBackClick}>
                {settingsPage && (
                    <XView flexGrow={1} flexShrink={0} flexDirection="column">
                        <XView
                            flexShrink={0}
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            marginBottom={40}
                        >
                            <XView fontSize={32} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                                New group
                            </XView>
                            <XButton style="primary" text="Next" onClick={this.handleAddMembers} />
                        </XView>
                        <XView flexShrink={0} flexDirection="row">
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
                                        placeholder="Group name"
                                        onChange={this.handleTitleChange}
                                        value={title}
                                        invalid={titleError}
                                    />
                                </XView>
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
                                            label: 'Secret group',
                                            subtitle:
                                                'People can view and join only by invite from a group member',
                                        },
                                        {
                                            value: SharedRoomKind.PUBLIC,
                                            label: 'Shared group',
                                            subtitle:
                                                'Group where your organization or community members communicate',
                                        },
                                    ]}
                                />
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
                    <XView flexGrow={1} flexShrink={0} flexDirection="column">
                        <XView
                            flexShrink={0}
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            marginBottom={40}
                        >
                            <XView fontSize={32} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                                Add members
                            </XView>
                            <XView flexShrink={0} flexDirection="row" alignItems="center">
                                <CreateRoomButton
                                    title={title}
                                    kind={type}
                                    members={[membersIds[0]]}
                                    organizationId={selectedOrg ? selectedOrg : myOrgId}
                                    imageUuid={coverSrc}
                                >
                                    <XButton text="Skip" />
                                </CreateRoomButton>
                                <CreateRoomButtonWithMembers
                                    title={title}
                                    kind={type}
                                    members={membersIds}
                                    organizationId={selectedOrg ? selectedOrg : myOrgId}
                                    imageUuid={coverSrc}
                                >
                                    <XButton style="primary" text="Add" />
                                </CreateRoomButtonWithMembers>
                            </XView>
                        </XView>
                        <SearchPeopleBox
                            onInputChange={this.onSearchPeopleInputChange}
                            value={options}
                            onChange={this.handleSearchPeopleInputChange}
                        />
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
    withUserInfo(props => (
        <>
            <XDocumentHead title="Create Room" />
            <CreateGroupInner
                myId={props.user ? props.user.id : ''}
                myOrgId={props.organization ? props.organization.id : ''}
            />
        </>
    )),
);
