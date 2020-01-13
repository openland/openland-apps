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
    RoomMembersPaginated_members,
} from 'openland-api/Types';
import { XModalProps } from 'openland-x-modal/XModal';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XTrack } from 'openland-x-analytics/XTrack';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OwnerLinkComponent } from 'openland-web/fragments/invite/OwnerLinkComponent';
import { ExplorePeople } from 'openland-web/fragments/create/ExplorePeople';
import { SearchBox } from 'openland-web/fragments/create/SearchBox';

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

    return (
        <>
            <XModalContent>
                <XTrack event="invite_view" params={{ invite_type: objType }} />
                <XTrack
                    event={`navigate_${objType}_add_members`}
                    params={{ invite_type: objType }}
                />
                <XView
                    height={props.isMobile ? '100%' : '65vh'}
                    flexGrow={1}
                    marginBottom={-24}
                    paddingTop={8}
                >
                    <XView marginBottom={16}>
                        <SectionTitle title="Share invitation link" />
                        <OwnerLinkComponent
                            id={props.id}
                            isGroup={props.isGroup}
                            isChannel={props.isChannel}
                            isOrganization={props.isOrganization}
                            isCommunity={props.isCommunity}
                        />
                    </XView>
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
                </XView>
            </XModalContent>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="secondary"
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
                              }
                            : undefined
                    }
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
