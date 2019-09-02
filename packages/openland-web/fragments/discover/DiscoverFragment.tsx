import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { AppConfig } from 'openland-y-runtime-web/AppConfig';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';

export const DiscoverFragment = React.memo(() => {
    const isNP = AppConfig.isNonProduction();

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <USideHeader title="Discover" />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XView flexDirection="column">
                    <UListItem title="Groups" path="/discover/groups" />
                    <UListItem title="Recommendations" path="/discover/recommendations" />
                    {isNP && <UListItem title="Feed" path="/feed" />}
                </XView>
            </XView>
        </XView>
    );
});