import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MutationFunc } from 'react-apollo';
import {
    RoomMemberRole,
    RoomAddMembers,
    RoomAddMembersVariables,
    OrganizationAddMember,
    OrganizationAddMemberVariables,
    OrganizationMembersShort,
    RoomMembersShort,
} from 'openland-api/Types';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XMutation } from 'openland-x/XMutation';
import { XPopper } from 'openland-x/XPopper';
import RevokeIcon from 'openland-icons/ic-revoke.svg';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';

interface RenewInviteLinkButtonProps {
    id: string;
    onClick: () => void;
    isOrganization?: boolean;
}

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const client = useClient();
    const id = props.id;
    let renew = undefined;

    if (!props.isOrganization) {
        renew = async () => {
            await client.mutateRoomRenewInviteLink({ roomId: id });
            await client.refetchRoomInviteLink({ roomId: id });
        };
    }

    if (props.isOrganization) {
        renew = async () => {
            await client.mutateOrganizationCreatePublicInvite({ organizationId: id });
            await client.refetchOrganizationPublicInvite({ organizationId: id });
        };
    }

    return (
        <XMutation mutation={renew} onSuccess={props.onClick}>
            <RevokeIcon />
        </XMutation>
    );
};

class RenewInviteLinkButtonWrapper extends React.PureComponent {
    render() {
        return (
            <XView position="absolute" right={110} top={12} cursor="pointer">
                {this.props.children}
            </XView>
        );
    }
}

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

interface OwnerLinkComponentProps {
    id: string;
    invite: string;
    isChannel?: boolean;
    isOrganization?: boolean;
    isCommunity?: boolean;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;

    state = {
        copied: false,
        resetLink: false,
    };

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    private copy = (e: any) => {
        if (this.input && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
        this.setState({
            copied: true,
        });
    };

    private resetLink = () => {
        this.setState({
            copied: false,
            resetLink: true,
        });
    };

    render() {
        const { props } = this;
        const { copied, resetLink } = this.state;
        let invitePath = props.isChannel ? '/joinChannel/' : '/invite/';
        let underLinkText = 'Anyone can use this link to join the group';
        if (props.isChannel) {
            underLinkText = 'Anyone with link can join as channel member';
        }
        if (props.isOrganization) {
            underLinkText = 'Anyone with link can join as organization member';
            invitePath = '/join/';
        }
        if (props.isCommunity) {
            underLinkText = 'Anyone with link can join as community member';
            invitePath = '/join/';
        }
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {props.invite && (
                    <XView flexDirection="column">
                        <XView fontSize={16} fontWeight="600" marginBottom={12}>
                            Invitation link
                        </XView>
                        <XView flexDirection="row" alignItems="center">
                            <XInput
                                size="large"
                                flexGrow={1}
                                ref={this.handleRef}
                                value={'https://openland.com' + invitePath + props.invite}
                                className={InputClassName}
                            />
                            <XPopper
                                content="Revoke link"
                                style="dark"
                                showOnHover={true}
                                placement="bottom"
                                zIndex={200}
                            >
                                <RenewInviteLinkButtonWrapper>
                                    <RenewInviteLinkButton
                                        id={props.id}
                                        onClick={this.resetLink}
                                        isOrganization={props.isOrganization}
                                    />
                                </RenewInviteLinkButtonWrapper>
                            </XPopper>
                            <XView
                                height={40}
                                borderRadius={8}
                                paddingLeft={7}
                                paddingRight={12}
                                flexDirection="row"
                                alignItems="center"
                                fontSize={14}
                                backgroundColor={copied ? '#69d06d' : '#E8F4FF'}
                                color={copied ? '#ffffff' : '#1790ff'}
                                cursor="pointer"
                                onClick={this.copy}
                                marginLeft={12}
                            >
                                {copied ? <CheckIcon /> : <CopiedIcon />}
                                <XView marginLeft={copied ? 2 : 6}>
                                    {copied ? 'Copied' : 'Copy'}
                                </XView>
                            </XView>
                        </XView>
                        <XView
                            fontSize={12}
                            color={resetLink ? '#20a825' : 'rgba(0, 0, 0, 0.5)'}
                            marginLeft={16}
                            marginTop={6}
                        >
                            {resetLink
                                ? 'The previous link is revoked and a new one has been created'
                                : underLinkText}
                        </XView>
                    </XView>
                )}
            </XVertical>
        );
    }
}

type OwnerLinkT = {
    id: string;
    isChannel?: boolean;
    isOrganization?: boolean;
    isCommunity?: boolean;
};

const OwnerLink = (props: OwnerLinkT) => {
    const client = useClient();

    let data = null;
    let link = null;
    if (!props.isOrganization) {
        data = client.useRoomInviteLink({ roomId: props.id });
        link = data.link;
    }
    if (props.isOrganization) {
        data = client.useWithoutLoaderOrganizationPublicInvite({
            organizationId: props.id,
        });
        link = data && data.publicInvite ? data.publicInvite.key : null;
    }

    if (!link) {
        return null;
    }

    return (
        <OwnerLinkComponent
            invite={link}
            id={props.id}
            isChannel={props.isChannel}
            isOrganization={props.isOrganization}
            isCommunity={props.isCommunity}
        />
    );
};

interface SearchBoxProps {
    value: { label: string; value: string }[] | null;
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

const SearchBox = (props: SearchBoxProps) => (
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
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    roomUsers: {
        user: {
            id: string;
        };
    }[];
}

const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();

    const data = client.useExplorePeople(props.variables);

    if (!data) {
        return null;
    }

    if (!data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    return (
        <XView flexGrow={1} flexShrink={0}>
            <XScrollView2 flexGrow={1} flexShrink={0}>
                <XView paddingHorizontal={16} flexDirection="column">
                    {data.items.edges.map(i => {
                        if (props.selectedUsers && props.selectedUsers.has(i.node.id)) {
                            return null;
                        }
                        if (props.roomUsers && props.roomUsers.find(j => j.user.id === i.node.id)) {
                            return (
                                <XView key={i.node.id}>
                                    <XUserCard
                                        user={i.node}
                                        noPath={true}
                                        customButton={null}
                                        disable={true}
                                    />
                                </XView>
                            );
                        }
                        return (
                            <XView
                                key={i.node.id}
                                onClick={() => props.onPick(i.node.name, i.node.id)}
                            >
                                <XUserCard user={i.node} noPath={true} customButton={null} />
                            </XView>
                        );
                    })}
                </XView>
            </XScrollView2>
        </XView>
    );
};

type RoomAddMembersType = MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
type OrganizationAddMembersType = MutationFunc<
    OrganizationAddMember,
    Partial<OrganizationAddMemberVariables>
>;

interface InviteModalProps extends XModalProps {
    id: string;
    addMembers: RoomAddMembersType | OrganizationAddMembersType;
    members: {
        user: {
            id: string;
        };
    }[];
    isMobile: boolean;
    isChannel?: boolean;
    isOrganization?: boolean;
    isCommunity?: boolean;
}

interface InviteModalState {
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
}

class AddMemberModalInner extends React.Component<InviteModalProps, InviteModalState> {
    constructor(props: InviteModalProps) {
        super(props);

        this.state = { searchQuery: '', selectedUsers: null };
    }

    private onInputChange = (data: string) => {
        this.setState({
            searchQuery: data,
        });
        return data;
    };

    private onChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        this.setState({
            selectedUsers: newSelected,
        });
    };

    private selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    };

    private onClosed = () => {
        this.setState({
            selectedUsers: null,
            searchQuery: '',
        });
    };

    render() {
        const { props } = this;
        const { selectedUsers } = this.state;
        let options: { label: string; value: string }[] = [];
        const invitesUsers: { userId: string; role: RoomMemberRole }[] = [];
        const invitesUsersIds: string[] = [];
        if (selectedUsers) {
            selectedUsers.forEach((l, v) => {
                options.push({
                    label: l,
                    value: v,
                });
            });

            selectedUsers.forEach((l, v) => {
                invitesUsers.push({ userId: v, role: RoomMemberRole.MEMBER });
                invitesUsersIds.push(v);
            });
        }
        return (
            <XModalForm
                autoClose={1500}
                title="Add members"
                target={props.target}
                submitBtnText="Add"
                submitProps={{
                    successText: 'Done!',
                }}
                width={props.isMobile ? undefined : 520}
                flexGrow={props.isMobile ? 1 : undefined}
                useTopCloser={true}
                targetQuery="inviteMembers"
                defaultAction={async () => {
                    if (!props.isOrganization) {
                        await (props.addMembers as RoomAddMembersType)({
                            variables: {
                                roomId: props.id,
                                invites: invitesUsers,
                            },
                        });
                    }

                    if (props.isOrganization) {
                        await (props.addMembers as OrganizationAddMembersType)({
                            variables: {
                                organizationId: props.id,
                                userIds: invitesUsersIds,
                            },
                        });
                    }

                    this.setState({
                        selectedUsers: null,
                    });
                }}
                onClosed={this.onClosed}
            >
                <XView
                    height={props.isMobile ? '100%' : '65vh'}
                    flexGrow={1}
                    marginHorizontal={-24}
                    marginTop={props.isMobile ? undefined : -6}
                    marginBottom={props.isMobile ? undefined : -24}
                >
                    <XView paddingHorizontal={24} marginBottom={32}>
                        <OwnerLink
                            id={props.id}
                            isChannel={props.isChannel}
                            isOrganization={props.isOrganization}
                            isCommunity={props.isCommunity}
                        />
                    </XView>
                    <XView fontSize={16} fontWeight="600" marginBottom={16} marginLeft={24}>
                        Invitation link
                    </XView>
                    <XView paddingHorizontal={24}>
                        <SearchBox
                            onInputChange={this.onInputChange}
                            value={options}
                            onChange={this.onChange}
                        />
                    </XView>
                    <ExplorePeople
                        variables={{ query: this.state.searchQuery }}
                        onPick={this.selectMembers}
                        selectedUsers={selectedUsers}
                        roomUsers={props.members}
                    />
                </XView>
            </XModalForm>
        );
    }
}

type AddMemberModalT = {
    id: string;
    isChannel?: boolean;
    isOrganization?: boolean;
    isCommunity?: boolean;
};

interface AddMemberToRoom {
    variables: {
        roomId: string;
        invites: { userId: string; role: RoomMemberRole }[];
    };
}

interface AddMemberToOrganization {
    variables: {
        organizationId: string;
        userIds: string[];
    };
}

export const AddMembersModal = React.memo(
    ({ id, isChannel, isOrganization, isCommunity }: AddMemberModalT & XModalProps) => {
        const isMobile = React.useContext(IsMobileContext);
        const client = useClient();

        const addMembersToRoom = async ({ variables }: AddMemberToRoom) => {
            await client.mutateRoomAddMembers({
                roomId: id,
                invites: variables.invites,
            });

            await client.refetchRoomMembersShort({ roomId: id });
        };

        const addMembersToOrganization = async ({ variables }: AddMemberToOrganization) => {
            await client.mutateOrganizationAddMember({
                organizationId: id,
                userIds: variables.userIds,
            });

            await client.refetchOrganizationMembersShort({ organizationId: id });
        };

        // TODO ask steve to add (opts?: QueryWatchParameters) to propagate fetchPolicy: 'network-only',
        let data = null;

        if (!isOrganization) {
            data = client.useWithoutLoaderRoomMembersShort({ roomId: id });
        }

        if (isOrganization) {
            data = client.useWithoutLoaderOrganizationMembersShort({ organizationId: id });
        }

        if (!data) {
            return null;
        }

        return (
            <AddMemberModalInner
                addMembers={isOrganization ? addMembersToOrganization : addMembersToRoom}
                id={id}
                members={
                    isOrganization
                        ? (data as OrganizationMembersShort).organization.members
                        : (data as RoomMembersShort).members
                }
                isMobile={isMobile}
                isChannel={isChannel}
                isOrganization={isOrganization}
                isCommunity={isCommunity}
            />
        );
    },
);
