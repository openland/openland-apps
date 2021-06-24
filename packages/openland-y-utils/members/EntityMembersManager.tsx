import * as React from 'react';
import {
    RoomMembersPaginated_members,
    OrganizationMemberRole,
    OrganizationMembers_organization_members_user,
} from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { OnlineWatcher } from 'openland-engines/messenger/Online';

export type OrgMember = {
    role: OrganizationMemberRole;
    user: OrganizationMembers_organization_members_user;
};
export type GroupMember = RoomMembersPaginated_members;
type MemberT = OrgMember | GroupMember;
type MembersT = MemberT[];

interface EntityMembersManagerProps {
    isGroup: boolean;
    entityId: string;
    membersCount: number;
    setMembers: React.Dispatch<React.SetStateAction<MembersT>>;
    setInitialMembers?: React.Dispatch<React.SetStateAction<MembersT>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    members: MembersT;
    loading: boolean;
    onlineWatcher: OnlineWatcher;
}

export interface EntityMembersManagerRef {
    handleLoadMore: () => Promise<void>;
}

export const EntityMembersManager = React.forwardRef(
    (props: EntityMembersManagerProps, ref: React.Ref<EntityMembersManagerRef>) => {
        const {
            isGroup,
            entityId,
            membersCount,
            setMembers,
            setInitialMembers,
            setLoading,
            members,
            loading,
            onlineWatcher,
        } = props;
        const client = useClient();

        const initialData = isGroup
            ? client.useRoomMembersPaginated(
                  { roomId: entityId, first: 30 },
                  { fetchPolicy: 'network-only' },
              ).members
            : client.useOrganizationMembers(
                  { organizationId: entityId, first: 30 },
                  { fetchPolicy: 'network-only' },
              ).organization.members;

        React.useEffect(() => {
            if (!members.length) {
                if (setInitialMembers) {
                    setInitialMembers(initialData);
                }
                setMembers(initialData);
                setLoading(false);
                onlineWatcher.onUsersAppear((initialData as MemberT[]).map((m) => m.user.id));
            }
        }, [initialData]);

        const handleLoadMore = React.useCallback(async () => {
            if (membersCount && members.length < membersCount && !loading) {
                setLoading(true);

                const loaded = isGroup
                    ? (
                          await client.queryRoomMembersPaginated(
                              {
                                  roomId: entityId,
                                  first: 10,
                                  after: members[members.length - 1].user.id,
                              },
                              { fetchPolicy: 'network-only' },
                          )
                      ).members
                    : (
                          await client.queryOrganizationMembers(
                              {
                                  organizationId: entityId,
                                  first: 10,
                                  after: members[members.length - 1].user.id,
                              },
                              { fetchPolicy: 'network-only' },
                          )
                      ).organization.members;

                setMembers((current) => [
                    ...current,
                    ...(loaded as MemberT[]).filter(
                        (m: MemberT) => !current.find((m2) => m2.user.id === m.user.id),
                    ),
                ]);
                setLoading(false);
                onlineWatcher.onUsersAppear((loaded as MemberT[]).map((m) => m.user.id));
            }
        }, [members, loading]);

        React.useImperativeHandle(ref, () => ({
            handleLoadMore: handleLoadMore,
        }));

        return null;
    },
);
