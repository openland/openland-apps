import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { DialogSearchResults } from '../dialogs/components/DialogSearchResults';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import IcHome from 'openland-icons/s/ic-home-24.svg';
import IcNew from 'openland-icons/s/ic-new-24.svg';
import IcPopular from 'openland-icons/s/ic-popular-24.svg';
import IcCollections from 'openland-icons/s/ic-collections-24.svg';
import IcPremium from 'openland-icons/s/ic-premium-24.svg';
import IcFree from 'openland-icons/s/ic-free-24.svg';
import IcStar from 'openland-icons/s/ic-star-24.svg';

export const DiscoverFragment = React.memo(() => {
    const isMobile = useIsMobile();
    const refInput = React.useRef<USearchInputRef>(null);
    const isVisible = useVisibleTab();
    React.useEffect(
        () => {
            if (isVisible) {
                trackEvent('navigate_discover');
            }
        },
        [isVisible],
    );

    const router = useTabRouter().router;
    const [query, setQuery] = React.useState<string>('');
    const isSearching = query.trim().length > 0;

    const onPick = React.useCallback((item: GlobalSearch_items) => {
        if (refInput && refInput.current) {
            refInput.current.reset();
        }
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
                ref={refInput}
                placeholder="Groups, people, and more"
            />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    {!isSearching && (
                        <XView flexDirection="column">
                            <UListItem
                                title="Home"
                                path={isMobile ? '/discover/home' : '/discover'}
                                icon={<IcHome />}
                            />
                            <UListItem
                                title="Popular now"
                                path="/discover/popular"
                                icon={<IcPopular />}
                            />
                            <UListItem
                                title="New and growing"
                                path="/discover/new"
                                icon={<IcNew />}
                            />
                            <UListItem
                                title="Collections"
                                path="/discover/collections"
                                icon={<IcCollections />}
                            />
                            <UListItem
                                title="Top premium"
                                path="/discover/premium"
                                icon={<IcPremium />}
                            />
                            <UListItem title="Top free" path="/discover/free" icon={<IcFree />} />
                            <UListItem
                                title="Recommendations"
                                path="/discover/recommendations"
                                icon={<IcStar />}
                            />
                        </XView>
                    )}

                    {isSearching && (
                        <DialogSearchResults variables={{ query: query }} onPick={onPick} />
                    )}
                </XScrollView3>
            </XView>
        </XView>
    );
});
