import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

export const DiscoverFragment = React.memo(() => {
    return (
        <XView flexDirection="column">
            <UListItem text="Chats for you" />
            <UListItem text="Groups and channels" />
            <UListItem text="Communities" />
            <UListItem text="People" />
            <UListItem text="Organizations" />
            <UListItem text="Explore" />
        </XView>
    );
});