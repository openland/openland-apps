import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import {
    RoomMemberRole,
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
import { SearchBox } from 'openland-web/fragments/create/SearchBox';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClose from 'openland-icons/s/ic-close-16.svg';
import { groupInviteCapabilities } from 'openland-y-utils/InviteCapabilities';
import { MembersWarning } from './components/MembersWarning';
import { UserSearch } from './components/UserSearch';

interface InviteModalProps {
    id: string;
    addMembers: any;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
    isPremium: boolean;
    canAddPeople: boolean;
    hideOwnerLink: boolean;
    hide?: () => void;
}

const sectionTitleStyle = css`
    height: 48px;
    padding: 12px 0;
    flex-shrink: 0;
    color: var(--foregroundPrimary);
`;

const SectionTitle = (props: { title: string }) => (
    <div className={cx(sectionTitleStyle, TextTitle3)}>{props.title}</div>
);

const AddMemberModalInner = (props: InviteModalProps) => {
    const { canAddPeople } = props;
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedUsers, setSelectedUsers] = React.useState<null | Map<string, string>>(null);
    const [warningShown, setWarningShown] = React.useState(false);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    React.useEffect(() => {
        if (selectedUsers && selectedUsers.size > 10 && !warningShown) {
            setWarningShown(true);
            showModalBox({ title: 'Do you know people you are adding?', width: 480 }, ctx => <MembersWarning hide={ctx.hide} parentHide={props.hide!}/>);
        }
    }, [selectedUsers?.size]);

    const objType = props.isGroup
        ? props.isChannel
            ? 'channel'
            : 'group'
        : props.isCommunity
            ? 'community'
            : 'organization';

    const onChange = (data: { label: string; value: string }[] | null) => {
        const newSelected = new Map();
        const newOpts: { label: string; value: string }[] = [];
        if (data) {
            data.map(i => {
                newSelected.set(i.value, i.label);
                newOpts.push({
                    label: i.label,
                    value: i.value,
                });
            });
        }
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
        <>
            {!canAddPeople && (
                <UIconButton
                    onClick={props.hide}
                    icon={<UIcon icon={<IcClose />} size={16} />}
                    size="small"
                    position="absolute"
                    right={26}
                    top={26}
                />
            )}
            <XModalContent>
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
                    {!props.hideOwnerLink && (
                        <XView marginBottom={canAddPeople ? 16 : 24}>
                            <SectionTitle title={`Share ${objType} link`} />
                            <OwnerLinkComponent
                                id={props.id}
                                isGroup={props.isGroup}
                                isChannel={props.isChannel}
                                isOrganization={props.isOrganization}
                                isCommunity={props.isCommunity}
                            />
                        </XView>
                    )}
                    {canAddPeople && (
                        <>
                            {!props.hideOwnerLink && (
                                <SectionTitle
                                    title={
                                        props.isPremium
                                            ? 'Add people directly and for free'
                                            : 'Add people directly'
                                    }
                                />
                            )}
                            <XView>
                                <SearchBox
                                    small={true}
                                    onInputChange={setSearchQuery}
                                    value={options}
                                    onChange={onChange}
                                />
                            </XView>
                            <React.Suspense
                                fallback={
                                    <XView flexGrow={1} flexShrink={0}>
                                        <XLoader loading={true} transparentBackground={true} />
                                    </XView>
                                }
                            >
                                <XView flexGrow={1} flexShrink={1} marginHorizontal={-24}>
                                    <UserSearch
                                        query={searchQuery}
                                        onPick={selectMembers}
                                        isOrganization={props.isOrganization}
                                        selectedUsers={selectedUsers}
                                        entityId={props.id}
                                    />
                                </XView>
                            </React.Suspense>
                        </>
                    )}
                </XView>
            </XModalContent>
            {canAddPeople && (
                <XModalFooter>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={props.hide} />
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
                </XModalFooter>
            )}
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
        };

        const addMembersToOrganization = async ({ variables }: AddMemberToOrganization) => {
            const addedMembers = (await client.mutateOrganizationAddMember({
                organizationId: id,
                userIds: variables.userIds,
            })).alphaOrganizationMemberAdd;

            if (onOrganizationMembersAdd) {
                onOrganizationMembersAdd(addedMembers);
            }
        };

        let isPremium = false;
        let hideOwnerLink = false;
        let canAddPeople = true;

        if (isGroup) {
            const chat = client.useRoomChat({ id: id }).room!;
            const sharedRoom = chat.__typename === 'SharedRoom' && chat;

            isPremium = sharedRoom && sharedRoom.isPremium;

            const { canAddDirectly, canGetInviteLink } = groupInviteCapabilities(chat);

            canAddPeople = canAddDirectly;
            hideOwnerLink = !canGetInviteLink;
        }
        return (
            <AddMemberModalInner
                hideOwnerLink={hideOwnerLink}
                hide={hide}
                addMembers={isOrganization ? addMembersToOrganization : addMembersToRoom}
                id={id}
                isGroup={isGroup}
                isChannel={isChannel}
                isOrganization={isOrganization}
                isCommunity={isCommunity}
                isPremium={isPremium}
                canAddPeople={canAddPeople}
            />
        );
    },
);

export const showAddMembersModal = (props: AddMemberModalT) => {
    showModalBox({ title: 'Add people', width: 480 }, ctx => (
        <AddMembersModal {...props} hide={ctx.hide} />
    ));
};
