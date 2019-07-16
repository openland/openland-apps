import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const DiscoverFragment = React.memo(() => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Discover
                </XView>
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XView flexDirection="column">
                    <UListItem text="Chats for you" path="/discover/recommended" />
                    <UListItem text="Groups and channels" path="/discover/groups" />
                </XView>
            </XView>
        </XView>
    );
});