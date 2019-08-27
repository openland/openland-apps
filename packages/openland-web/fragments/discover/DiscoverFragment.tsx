import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { AppConfig } from 'openland-y-runtime-web/AppConfig';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';

export const DiscoverFragment = React.memo(() => {
    let isNP = AppConfig.isNonProduction();
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <USideHeader title="Home" />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XView flexDirection="column">
                    {isNP && <UListItem title="All" path="/all" />}
                    <UListItem title="Recommended" path="/discover/recommended" />
                    <UListItem title="Groups" path="/discover/groups" />
                </XView>
            </XView>
        </XView>
    );
});