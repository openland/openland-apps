import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { RoomShort_SharedRoom } from 'openland-api/Types';
import { plural } from 'openland-y-utils/plural';

export const UGroupView = React.memo((props: { group: RoomShort_SharedRoom }) => {
    const { id, photo, title, membersCount } = props.group;

    return (
        <UListItem
            title={title}
            description={membersCount ? plural(membersCount, ['member', 'members']) : undefined}
            avatar={{ photo, id, title }}
            useRadius={true}
            path={'/mail/' + id}
        />
    );
});