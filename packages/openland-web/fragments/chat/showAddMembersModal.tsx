import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import {
    RoomMemberRole,
    OrganizationMembersShort,
    RoomMembersShort,
    OrganizationMembers_organization_members,
    RoomMembersPaginated_members,
} from 'openland-api/spacex.types';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { XTrack } from 'openland-x-analytics/XTrack';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OwnerLinkComponent } from 'openland-web/fragments/invite/OwnerLinkComponent';
import { ExplorePeople } from 'openland-web/fragments/create/ExplorePeople';
import { SearchBox } from 'openland-web/fragments/create/SearchBox';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClose from 'openland-icons/s/ic-close-16.svg';

interface InviteModalProps {
    id: string;
    addMembers: any;
    members: {
        user: {
            id: string;
        };
    }[];
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
    isPremium: boolean;
    isOwner: boolean;
    hide?: () => void;
}

const sectionTitleStyle = css`
    height: 48px;
    padding: 12px 0;
    flex-shrink: 0;
`;

const SectionTitle = (props: { title: string }) => (
    <div className={cx(sectionTitleStyle, TextTitle3)}>{props.title}</div>
);

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

    const canAddPeople = (!props.isPremium || props.isOwner);

    return (
        <>
            {!canAddPeople && <UIconButton
                onClick={props.hide}
                icon={<UIcon icon={<IcClose />} size={16} />}
                size="small"
                position="absolute"
                right={26}
                top={26}
            />}
            <XModalContent >
                <XTrack event="invite_view" params={{ invite_type: objType }} />
                <XTrack
                    event={`navigate_${objType}_add_members`}
                    params={{ invite_type: objType }}
                />

                <XView
                    height={canAddPeople ? '65vh' : undefined}
                    flexGrow={1}
                    marginBottom={-24}
                    paddingTop={8}
                >
                    <XView marginBottom={canAddPeople ? 16 : 24}>
                        <SectionTitle title="Share invitation link" />
                        <OwnerLinkComponent
                            id={props.id}
                            isGroup={props.isGroup}
                            isChannel={props.isChannel}
                            isOrganization={props.isOrganization}
                            isCommunity={props.isCommunity}
                        />
                    </XView>
                    {canAddPeople &&
                        <>
                            <SectionTitle title="Add people directly" />
                            <XView>
                                <SearchBox
                                    small={true}
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
                                <XView flexGrow={1} flexShrink={1} marginHorizontal={-24}>
                                    <ExplorePeople
                                        query={searchQuery}
                                        onPick={selectMembers}
                                        selectedUsers={selectedUsers}
                                        roomUsers={props.members}
                                    />
                                </XView>
                            </React.Suspense>
                        </>
                    }
                </XView>
            </XModalContent>
            {canAddPeople && <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={props.hide}
                />
                <UButton
                    text="Add"
                    style="primary"
                    size="large"
                    disable={!options.length}
                    onClick={
                        !!options.length
                            ? async () => {
                                if (props.isGroup) {
                                    await (props.addMembers as any)({
                                        variables: {
                                            roomId: props.id,
                                            invites: options.map(i => ({
                                                userId: i.value,
                                                role: RoomMemberRole.MEMBER,
                                            })),
                                        },
                                    });
                                } else if (props.isOrganization) {
                                    await (props.addMembers as any)({
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
                            }
                            : undefined
                    }
                />
            </XModalFooter>}
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
    }: AddMemberModalT & { hide?: () => void }) => {
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
        let isPremium = false;
        let isOwner = false;

        if (isGroup) {
            data = client.useRoomMembersShort({ roomId: id });
            let group = client.useRoomWithoutMembers({ id: id });
            isPremium = group.room?.__typename === 'SharedRoom' && group.room.isPremium;
            isOwner = group.room?.__typename === 'SharedRoom' && group.room.role === 'OWNER';
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
                isGroup={isGroup}
                isChannel={isChannel}
                isOrganization={isOrganization}
                isCommunity={isCommunity}
                isPremium={isPremium}
                isOwner={isOwner}
            />
        );
    },
);

export const showAddMembersModal = (props: AddMemberModalT) => {
    showModalBox({ title: 'Add people', width: 480 }, ctx => (
        <AddMembersModal {...props} hide={ctx.hide} />
    ));
};
