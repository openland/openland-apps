import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { AppConfig } from 'openland-y-runtime-web/AppConfig';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import IcStar from 'openland-icons/s/ic-star-24.svg';

export const DiscoverFragment = React.memo(() => {
    const isNP = AppConfig.isNonProduction();
    const isVisible = useVisibleTab();
    React.useEffect(
        () => {
            if (isVisible) {
                trackEvent('navigate_discover');
            }
        },
        [isVisible],
    );

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <USideHeader title="Discover" />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XView flexDirection="column">
                    <UListItem title="Home" path="/discover/home" />
                    <UListItem title="New and growing" path="/discover/new" />
                    <UListItem title="Groups" path="/discover/groups" />
                    <UListItem title="Popular now" path="/discover/popular" />
                    <UListItem
                        title="Recommendations"
                        path="/discover/recommendations"
                        icon={<IcStar />}
                    />
                    {isNP && <UListItem title="Feed" path="/feed" />}
                </XView>
            </XView>
        </XView>
    );
});
