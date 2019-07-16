import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

export const DiscoverFragment = React.memo(() => {
    return (
        <XView flexDirection="column">
            <UListItem text="Chats for you" path="/discover/recommended" />
            <UListItem text="Groups and channels" path="/discover/groups" />
            <UListItem text="Communities" path="/discover/communities" />
            <UListItem text="People" path="/discover/people" />
            <UListItem text="Organizations" path="/discover/organizations" />
            <UListItem text="Explore" path="/discover/explore" />
        </XView>
    );
});