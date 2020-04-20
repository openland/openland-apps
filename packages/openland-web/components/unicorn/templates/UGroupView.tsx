import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { SharedRoomView } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';

export const UGroupView = React.memo((props: { group: SharedRoomView & { newMessages?: number }, disableHover?: boolean, rightElement?: JSX.Element, path?: string }) => {
    const { id, photo, title, membersCount, newMessages } = props.group;
    const description = newMessages
        ? plural(newMessages, ['new message', 'new messages'])
        : membersCount ? plural(membersCount, ['member', 'members'])
            : undefined;

    return (
        <UListItem
            title={title}
            description={description}
            avatar={{ photo, id, title }}
            useRadius={true}
            path={props.path || ('/mail/' + id)}
            disableHover={props.disableHover}
            rightElement={props.rightElement}
        />
    );
});