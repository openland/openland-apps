import * as React from 'react';

import { useClient } from 'openland-api/useClient';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';

import MoreHIcon from 'openland-icons/s/ic-more-h-24.svg';

export const UserGroups = React.memo((props: { id: string }) => {
    const client = useClient();
    const { id } = props;
    const { commonChatsWithUser } = client.useCommonChatsWithUser({ uid: id, first: 3 }, { fetchPolicy: 'network-only' });
    const { items, count, cursor } = commonChatsWithUser;

    const [displayGroups, setDisplayGroups] = React.useState(items);
    const [groupsAfter, setGroupsAfter] = React.useState(cursor);
    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [groupsOpenedCount, setGroupsOpenedCount] = React.useState(0);

    const handleLoadMoreGroups = React.useCallback(async () => {
        if (groupsLoading || !groupsAfter) {
            return;
        }
        setGroupsLoading(true);
        const first = groupsOpenedCount === 2 ? count - 20 : 10;
        const loaded = await client.queryCommonChatsWithUser(
            {
                uid: id,
                first,
                after: groupsAfter,
            },
            { fetchPolicy: 'network-only' },
        );
        setGroupsAfter(loaded.commonChatsWithUser.cursor);
        setDisplayGroups((prev) => prev.concat(loaded.commonChatsWithUser.items));
        setGroupsOpenedCount((prev) => prev + 1);
        setGroupsLoading(false);
    }, [groupsAfter, groupsLoading, displayGroups]);

    return (
            <UListGroup header="Mutual groups" counter={count}>
                {displayGroups.map((group) => (
                    <UGroupView key={'room-' + group.id} group={group} />
                ))}
                {displayGroups.length !== count && (
                    <UListItem
                        title={groupsOpenedCount < 2 ? 'Show more' : 'Show all'}
                        icon={<MoreHIcon />}
                        iconColor="var(--foregroundSecondary)"
                        iconBackground="var(--backgroundTertiaryTrans)"
                        useRadius={true}
                        onClick={handleLoadMoreGroups}
                    />
                )}
            </UListGroup>
    );
});
