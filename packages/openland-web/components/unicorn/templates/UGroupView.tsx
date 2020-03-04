import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { SharedRoomView } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';

export const UGroupView = React.memo((props: { group: SharedRoomView, disableHover?: boolean, rightElement?: JSX.Element }) => {
    const { id, photo, title, membersCount } = props.group;

    return (
        <UListItem
            title={title}
            description={membersCount ? plural(membersCount, ['member', 'members']) : undefined}
            avatar={{ photo, id, title }}
            useRadius={true}
            path={'/mail/' + id}
            disableHover={props.disableHover}
            rightElement={props.rightElement}
        />
    );
});