import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { AppConfig } from 'openland-y-runtime-web/AppConfig';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';

import IcHome from 'openland-icons/s/ic-home-24.svg';
import IcNew from 'openland-icons/s/ic-new-24.svg';
import IcPopular from 'openland-icons/s/ic-popular-24.svg';
import IcCollections from 'openland-icons/s/ic-collections-24.svg';
import IcPremium from 'openland-icons/s/ic-premium-24.svg';
import IcFree from 'openland-icons/s/ic-free-24.svg';
import IcStar from 'openland-icons/s/ic-star-24.svg';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { DialogSearchResults } from '../dialogs/components/DialogSearchResults';
import { GlobalSearch_items } from 'openland-api/spacex.types';

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

    const router = React.useContext(XViewRouterContext)!;
    const [query, setQuery] = React.useState<string>('');
    const isSearching = query.trim().length > 0;

    const onPick = React.useCallback((item: GlobalSearch_items) => {
        // setQuery('');
        if (item.__typename === 'Organization') {
            router.navigate(`/${item.shortname || item.id}`);
            return;
        }
        router.navigate(`/mail/${item.id}`);
    }, []);

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <USideHeader title="Discover" />
            <USearchInput
                value={query}
                onChange={setQuery}
                marginHorizontal={16}
                marginBottom={16}
                placeholder="Groups and people"
            />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>

                {!isSearching && (
                    <XView flexDirection="column">
                        <UListItem title="Home" path="/discover/home" icon={<IcHome />} />
                        <UListItem title="New and growing" path="/discover/new" icon={<IcNew />} />
                        <UListItem title="Popular now" path="/discover/popular" icon={<IcPopular />} />
                        <UListItem title="Collections" path="/discover/collections" icon={<IcCollections />} />
                        <UListItem title="Top premium" path="/discover/premium" icon={<IcPremium />} />
                        <UListItem title="Top free" path="/discover/free" icon={<IcFree />} />
                        <UListItem
                            title="Recommendations"
                            path="/discover/recommendations"
                            icon={<IcStar />}
                        />
                        {/* <UListItem title="Groups" path="/discover/groups" /> */}
                        {isNP && <UListItem title="Feed" path="/feed" />}
                    </XView>
                )}

                {isSearching && (
                    <DialogSearchResults
                        variables={{ query: query }}
                        onPick={onPick}
                    />
                )}

            </XView>
        </XView>
    );
});
