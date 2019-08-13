import * as React from 'react';
import { css, cx } from 'linaria';
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
    OrganizationMembers_organization_members,
} from 'openland-api/Types';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XMutation } from 'openland-x/XMutation';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import RevokeIcon from 'openland-icons/ic-revoke.svg';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';
import { XTrack } from 'openland-x-analytics/XTrack';
import { trackEvent } from 'openland-x-analytics';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XButton } from 'openland-x/XButton';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';

interface RenewInviteLinkButtonProps {
    id: string;
    onClick: () => void;
    isRoom: boolean;
    isOrganization: boolean;
}

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const client = useClient();
    const id = props.id;
    let renew = undefined;

    if (props.isRoom) {
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
            <XView position="absolute" right={14} top={11} cursor="pointer">
                {this.props.children}
            </XView>
        );
    }
}

const InputClassName = css`
    border-radius: 8px !important;
    background: #f9f9f9 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

interface OwnerLinkComponentProps {
    id: string;
    invite: string;
    isRoom: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
}

const CopyButtonClassName = css`
    display: flex;
    height: 40px;
    border-radius: 8px;
    padding-left: 14px;
    padding-right: 14px;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    background-color: #e8f4ff;
    color: #1790ff;
    transition: all 0.3s ease, color 0.08s ease-in, border 0s, all 0.15s ease;
    cursor: pointer;
    margin-left: 12px;
    &:hover {
        background-color: #1790ff;
        color: #fff;

        & svg g path:last-child {
            fill: #a3d2ff;
        }
    }
`;

const CopyButtonHoverClassName = css`
    background-color: #69d06d;
    color: #fff;
    &:hover {
        background-color: #69d06d;
        & svg g path:last-child {
            fill: #fff;
        }
    }
`;

// TODO reuse OwnerLinkComponent from openland-web/fragments/OwnerLinkComponent.tsx
class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;
    timer: any;

    state = {
        copied: false,
        resetLink: false,
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    }

    private copy = (e: any) => {
        const { props } = this;
        const objType = props.isRoom
            ? props.isChannel
                ? 'channel'
                : 'group'
            : props.isCommunity
                ? 'community'
                : 'organization';

        trackEvent('invite_link_action', { invite_type: objType, action_type: 'link_copied' });

        if (this.input && this.input.inputRef) {
            const isIos = window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
            this.input.inputRef.inputRef.select();
            if (isIos) {
                this.input.inputRef.inputRef.setSelectionRange(0, 99999);
            }
            document.execCommand('copy');
            this.input.inputRef.inputRef.blur();
        }
        this.setState({
            copied: true,
        });

        this.timer = setTimeout(() => {
            this.setState({
                copied: false,
            });
        }, 1500);
    }

    private resetLink = () => {
        this.setState({
            copied: false,
            resetLink: true,
        });

        this.timer = setTimeout(() => {
            this.setState({
                copied: false,
                resetLink: false,
            });
        }, 3000);
    }

    render() {
        const { props } = this;
        const { copied, resetLink } = this.state;
        let invitePath = '/invite/';
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
                            <XView flexDirection="row" alignItems="center" flexGrow={1}>
                                <XInput
                                    size="large"
                                    flexGrow={1}
                                    ref={this.handleRef}
                                    value={'https://openland.com' + invitePath + props.invite}
                                    className={InputClassName}
                                />
                                <XPolitePopper
                                    content={<div style={{ textAlign: 'center' }}>Revoke link</div>}
                                    style="dark"
                                    showOnHover={true}
                                    placement="bottom"
                                    zIndex={200}
                                >
                                    <RenewInviteLinkButtonWrapper>
                                        <RenewInviteLinkButton
                                            id={props.id}
                                            onClick={this.resetLink}
                                            isRoom={props.isRoom}
                                            isOrganization={props.isOrganization}
                                        />
                                    </RenewInviteLinkButtonWrapper>
                                </XPolitePopper>
                            </XView>
                            <div
                                className={cx(
                                    CopyButtonClassName,
                                    copied && CopyButtonHoverClassName,
                                )}
                                onClick={this.copy}
                            >
                                {copied ? <CheckIcon /> : <CopiedIcon />}
                                <XView marginLeft={10}>{copied ? 'Copied' : 'Copy'}</XView>
                            </div>
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
    isRoom: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
};

const OwnerLink = (props: OwnerLinkT) => {
    const client = useClient();

    let data = null;
    let link = null;
    if (props.isRoom) {
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
            isRoom={props.isRoom}
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
                <XView marginTop={12} flexDirection="column">
                    {data.items.edges.map(i => {
                        if (props.selectedUsers && props.selectedUsers.has(i.node.id)) {
                            return null;
                        }
                        return (
                            <UUserView
                                key={i.node.id}
                                user={i.node}
                                onClick={() => props.onPick(i.node.name, i.node.id)}
                                disabled={!!(props.roomUsers && props.roomUsers.find(j => j.user.id === i.node.id))}
                            />
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
    isRoom: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;

    hide?: () => void;
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
    }

    private onChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        this.setState({
            selectedUsers: newSelected,
        });
    }

    private selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    }

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
        const objType = props.isRoom
            ? props.isChannel
                ? 'channel'
                : 'group'
            : props.isCommunity
                ? 'community'
                : 'organization';

        return (
            <>
                <XModalContent>
                    <XTrack event="invite_view" params={{ invite_type: objType }} />
                    <XView
                        height={props.isMobile ? '100%' : '65vh'}
                        flexGrow={1}
                        marginBottom={-30}
                    >
                        <XView marginBottom={26}>
                            <OwnerLink
                                id={props.id}
                                isRoom={props.isRoom}
                                isChannel={props.isChannel}
                                isOrganization={props.isOrganization}
                                isCommunity={props.isCommunity}
                            />
                        </XView>
                        <XView fontSize={16} fontWeight="600" marginBottom={16}>
                            Add people directly
                        </XView>
                        <XView>
                            <SearchBox
                                onInputChange={this.onInputChange}
                                value={options}
                                onChange={this.onChange}
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
                                variables={{ query: this.state.searchQuery }}
                                onPick={this.selectMembers}
                                selectedUsers={selectedUsers}
                                roomUsers={props.members}
                            />
                        </React.Suspense>
                    </XView>
                </XModalContent>
                <XModalFooter>
                    <XView marginRight={12}>
                        <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                    </XView>
                    <XButton
                        text="Add"
                        style="primary"
                        size="large"
                        onClick={async () => {
                            if (props.isRoom) {
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

                            if (props.hide) {
                                props.hide();
                            }
                        }}
                    />
                </XModalFooter>
            </>
        );
    }
}

type AddMemberModalT = {
    id: string;
    isRoom: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;

    onOrganizationMembersAdd?: (members: OrganizationMembers_organization_members[]) => void;
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
    ({
        id,
        isRoom,
        isChannel,
        isOrganization,
        isCommunity,
        onOrganizationMembersAdd,
        hide,
    }: AddMemberModalT & XModalProps & { hide?: () => void }) => {
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
            const addedMembers = (await client.mutateOrganizationAddMember({
                organizationId: id,
                userIds: variables.userIds,
            })).alphaOrganizationMemberAdd;

            if (onOrganizationMembersAdd) {
                onOrganizationMembersAdd(addedMembers);
            }

            await client.refetchOrganizationMembersShort({ organizationId: id });
        };

        let data = null;

        if (isRoom) {
            data = client.useRoomMembersShort({ roomId: id });
        }

        if (isOrganization) {
            data = client.useOrganizationMembersShort({ organizationId: id });
        }

        return (
            <AddMemberModalInner
                hide={hide}
                addMembers={isOrganization ? addMembersToOrganization : addMembersToRoom}
                id={id}
                members={
                    isOrganization
                        ? (data as OrganizationMembersShort).organization.members
                        : (data as RoomMembersShort).members
                }
                isMobile={isMobile}
                isRoom={isRoom}
                isChannel={isChannel}
                isOrganization={isOrganization}
                isCommunity={isCommunity}
            />
        );
    },
);

export const showAddMembersModal = (props: AddMemberModalT) => {
    showModalBox({ title: 'Add members' }, ctx => <AddMembersModal {...props} hide={ctx.hide} />);
};
