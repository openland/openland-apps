import * as React from 'react';
import copy from 'copy-to-clipboard';
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
    RoomMembersPaginated_members,
} from 'openland-api/Types';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XMutation } from 'openland-x/XMutation';
import { XTrack } from 'openland-x-analytics/XTrack';
import { trackEvent } from 'openland-x-analytics';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import IcCopy from 'openland-icons/s/ic-copy-24.svg';
import IcDone from 'openland-icons/s/ic-done-24.svg';
import IcDelete from 'openland-icons/s/ic-delete-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';

interface RenewInviteLinkButtonProps {
    id: string;
    isGroup: boolean;
    isOrganization: boolean;
}

const renewContainer = css`
    position: absolute;
    cursor: pointer;
    right: 14px;
    top: 11px;
`;

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const [show] = useCaptionPopper({ text: 'Revoke link' });
    const client = useClient();
    const id = props.id;
    let renew = undefined;

    if (props.isGroup) {
        renew = async () => {
            await client.mutateRoomRenewInviteLink({ roomId: id });
            await client.refetchRoomInviteLink({ roomId: id });
        };
    } else if (props.isOrganization) {
        renew = async () => {
            await client.mutateOrganizationCreatePublicInvite({ organizationId: id });
            await client.refetchOrganizationPublicInvite({ organizationId: id });
        };
    }

    return (
        <XMutation mutation={renew}>
            <div className={renewContainer}>
                <UIcon icon={<IcDelete />} size={20} onMouseEnter={show} />
            </div>
        </XMutation>
    );
};

const CopyButtonClassName = css`
    display: flex;
    height: 40px;
    border-radius: 8px;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: row;
    align-items: center;
    background-color: var(--backgroundTertiary);
    color: var(--foregroundSecondary);
    transition: all 0.15s ease;
    cursor: pointer;
    & svg path {
        transition: all 0.15s ease;
    }
    &:hover {
        background-color: var(--backgroundTertiaryHover);
    }
`;

const CopyButtonHoverClassName = css`
    background-color: var(--accentPositive);
    color: var(--backgroundPrimary);
    & svg path:last-child {
        fill: var(--backgroundPrimary);
    }
    &:hover {
        background-color: var(--accentPositive);
        & svg path:last-child {
            fill: var(--backgroundPrimary);
        }
    }
`;

const linkStyle = css`
    flex-grow: 1;
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px;
    background-color: var(--backgroundTertiary);
`;

interface OwnerLinkComponentProps {
    id: string;
    invite: string;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
}

const OwnerLinkComponent = (props: OwnerLinkComponentProps) => {
    const [copied, setCopied] = React.useState(false);

    let invitePart = '/invite/';
    if (props.isOrganization || props.isCommunity) {
        invitePart = '/join/';
    }
    const invitePath = 'https://openland.com' + invitePart + props.invite;

    const copyPath = () => {
        const objType = props.isGroup
            ? props.isChannel
                ? 'channel'
                : 'group'
            : props.isCommunity
                ? 'community'
                : 'organization';

        trackEvent('invite_link_action', { invite_type: objType, action_type: 'link_copied' });
        copy(invitePath);
        setCopied(true);

        const t = setTimeout(() => {
            setCopied(false);
        }, 1500);

        return () => clearTimeout(t);
    };

    return (
        <XView flexDirection="column">
            <XView fontSize={16} fontWeight="600" marginBottom={12}>
                Invitation link
            </XView>
            <XView flexDirection="row" alignItems="center">
                <XView flexDirection="row" alignItems="center" flexGrow={1} marginRight={8}>
                    <div className={cx(linkStyle, TextBody)}>{invitePath}</div>
                    <RenewInviteLinkButton
                        id={props.id}
                        isGroup={props.isGroup}
                        isOrganization={props.isOrganization}
                    />
                </XView>
                <div
                    className={cx(
                        CopyButtonClassName,
                        copied && CopyButtonHoverClassName,
                        TextLabel1,
                    )}
                    onClick={copyPath}
                >
                    <UIcon
                        icon={copied ? <IcDone /> : <IcCopy />}
                        color={copied ? '--backgroundPrimary' : undefined}
                        size={20}
                    />
                    <XView marginLeft={8}>{copied ? 'Copied' : 'Copy'}</XView>
                </div>
            </XView>
        </XView>
    );
};

type OwnerLinkT = {
    id: string;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
};

const OwnerLink = (props: OwnerLinkT) => {
    const client = useClient();
    let data = null;
    let link = null;

    if (props.isGroup) {
        data = client.useRoomInviteLink({ roomId: props.id });
        link = data.link;
    } else if (props.isOrganization) {
        data = client.useWithoutLoaderOrganizationPublicInvite({
            organizationId: props.id,
        });
        link = data && data.publicInvite ? data.publicInvite.key : null;
    }

    return (
        <OwnerLinkComponent
            invite={link || ''}
            id={props.id}
            isGroup={props.isGroup}
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
                                disabled={
                                    !!(
                                        props.roomUsers &&
                                        props.roomUsers.find(j => j.user.id === i.node.id)
                                    )
                                }
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
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;

    hide?: () => void;
}

const AddMemberModalInner = (props: InviteModalProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedUsers, setSelectedUsers] = React.useState<null | Map<string, string>>(null);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const objType = props.isGroup
        ? props.isChannel
            ? 'channel'
            : 'group'
        : props.isCommunity
            ? 'community'
            : 'organization';

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
        setSelectedUsers(newSelected);
        setOptions(newOpts);
    };

    const selectMembers = (label: string, value: string) => {
        const selected = selectedUsers || new Map();
        const newOpts: { label: string; value: string }[] = [];
        selected.set(value, label);
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
        <>
            <XModalContent>
                <XTrack event="invite_view" params={{ invite_type: objType }} />
                <XView height={props.isMobile ? '100%' : '65vh'} flexGrow={1} marginBottom={-30}>
                    <XView marginBottom={26}>
                        <OwnerLink
                            id={props.id}
                            isGroup={props.isGroup}
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
                            onInputChange={onInputChange}
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
                        <ExplorePeople
                            variables={{ query: searchQuery }}
                            onPick={selectMembers}
                            selectedUsers={selectedUsers}
                            roomUsers={props.members}
                        />
                    </React.Suspense>
                </XView>
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="secondary" size="large" onClick={props.hide} />
                <UButton
                    text="Add"
                    style="primary"
                    size="large"
                    onClick={async () => {
                        if (props.isGroup) {
                            await (props.addMembers as RoomAddMembersType)({
                                variables: {
                                    roomId: props.id,
                                    invites: options.map(i => ({
                                        userId: i.value,
                                        role: RoomMemberRole.MEMBER,
                                    })),
                                },
                            });
                        } else if (props.isOrganization) {
                            await (props.addMembers as OrganizationAddMembersType)({
                                variables: {
                                    organizationId: props.id,
                                    userIds: options.map(i => i.value),
                                },
                            });
                        }
                        setSelectedUsers(null);
                        if (props.hide) {
                            props.hide();
                        }
                    }}
                />
            </XModalFooter>
        </>
    );
};

type AddMemberModalT = {
    id: string;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;

    onOrganizationMembersAdd?: (members: OrganizationMembers_organization_members[]) => void;
    onGroupMembersAdd?: (members: RoomMembersPaginated_members[]) => void;
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
        isGroup,
        isChannel,
        isOrganization,
        isCommunity,
        onOrganizationMembersAdd,
        onGroupMembersAdd,
        hide,
    }: AddMemberModalT & XModalProps & { hide?: () => void }) => {
        const isMobile = React.useContext(IsMobileContext);
        const client = useClient();

        const addMembersToRoom = async ({ variables }: AddMemberToRoom) => {
            const addedMembers = (await client.mutateRoomAddMembers({
                roomId: id,
                invites: variables.invites,
            })).alphaRoomInvite;

            if (onGroupMembersAdd) {
                onGroupMembersAdd(addedMembers);
            }

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

        if (isGroup) {
            data = client.useRoomMembersShort({ roomId: id });
        } else if (isOrganization) {
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
                isGroup={isGroup}
                isChannel={isChannel}
                isOrganization={isOrganization}
                isCommunity={isCommunity}
            />
        );
    },
);

export const showAddMembersModal = (props: AddMemberModalT) => {
    showModalBox({ title: 'Add people', width: 480 }, ctx => (
        <AddMembersModal {...props} hide={ctx.hide} />
    ));
};
