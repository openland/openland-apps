import * as React from 'react';

import { useClient } from 'openland-api/useClient';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

import MoreHIcon from 'openland-icons/s/ic-more-h-24.svg';

export const OrganizationGroups = React.memo((props: { id: string; roomsCount: number }) => {
    const client = useClient();
    const { id, roomsCount } = props;
    const initialGroups = client.useOrganizationPublicRooms(
        { organizationId: id, first: 3 },
        { fetchPolicy: 'network-only' },
    ).organizationPublicRooms;
    const [displayGroups, setDisplayGroups] = React.useState(initialGroups.items);
    const [groupsAfter, setGroupsAfter] = React.useState(initialGroups.cursor);
    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [groupsOpenedCount, setGroupsOpenedCount] = React.useState(0);

    const handleLoadMoreGroups = React.useCallback(async () => {
        if (groupsLoading || !groupsAfter) {
            return;
        }
        setGroupsLoading(true);
        const first = groupsOpenedCount === 2 ? roomsCount - 20 : 10;
        const loaded = await client.queryOrganizationPublicRooms(
            {
                organizationId: id,
                first,
                after: groupsAfter,
            },
            { fetchPolicy: 'network-only' },
        );
        const { items, cursor } = loaded.organizationPublicRooms;
        setGroupsAfter(cursor);
        setDisplayGroups((prev) => prev.concat(items));
        setGroupsOpenedCount((prev) => prev + 1);
        setGroupsLoading(false);
    }, [groupsAfter, groupsLoading, displayGroups]);

    return (
        <>
            {displayGroups.map((group) => (
                <UGroupView key={'room-' + group.id} group={group} />
            ))}
            {displayGroups.length !== roomsCount && (
                <UListItem
                    title={groupsOpenedCount < 2 ? 'Show more' : 'Show all'}
                    icon={<MoreHIcon />}
                    iconColor="var(--foregroundSecondary)"
                    iconBackground="var(--backgroundTertiary)"
                    useRadius={true}
                    onClick={handleLoadMoreGroups}
                />
            )}
        </>
    );
});
