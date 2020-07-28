import * as React from 'react';
import { XView, XViewRouterContext, XViewProps, XViewRouteContext } from 'react-mental';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { GlobalSearch_items, GlobalSearch_items_SharedRoom, MyContacts_myContacts_items_user } from 'openland-api/spacex.types';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { ContactsSearchResults, ContactsSearchItemRender } from './ContactsSearchResults';
import { useStackVisibility } from 'openland-unicorn/StackVisibilityContext';
import { css, cx } from 'linaria';
import { TextStyles, TextBody } from 'openland-web/utils/TextStyles';
import { useListSelection } from 'openland-web/utils/useListSelection';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { useLocalContacts } from 'openland-y-utils/contacts/LocalContacts';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import AppleIcon from 'openland-icons/s/ic-apple-glyph-24.svg';
import GoogleIcon from 'openland-icons/s/ic-google-play-glyph-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const emptyScreenImg = css`
    height: 200px;
    width: 320px;
`;

const emptyScreenSubtitle = cx(TextBody, css`
    padding: 0 8px;
    color: var(--foregroundSecondary);
    text-align: center;
`);

const findFriendsImgSrc = css`
    background: url(https://cdn.openland.com/shared/art/art-crowd.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-crowd.png) 1x, url(https://cdn.openland.com/shared/art/art-crowd@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-crowd@3x.png) 3x);
`;

const noContactsImgSrc = css`
    background: url(https://cdn.openland.com/shared/art/art-shared.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-shared.png) 1x, url(https://cdn.openland.com/shared/art/art-shared@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-shared@3x.png) 3x);
`;

const MobileAppButton = (props: { isIOS: boolean } & XViewProps) => {
    const { isIOS, ...other } = props;
    const onClick = React.useCallback(() => {
        trackEvent('app_download_action', {
            os: isIOS ? 'ios' : 'android',
            app_platform: 'mobile',
        });
    }, []);

    return (
        <XView
            as="a"
            target="_blank"
            flexDirection="row"
            paddingHorizontal={16}
            paddingVertical={8}
            backgroundColor="var(--backgroundTertiaryTrans)"
            hoverBackgroundColor="var(--backgroundTertiaryHoverTrans)"
            borderRadius={8}
            onClick={onClick}
            width={200}
            hoverTextDecoration="none"
            {...other}
        >
            <XView justifyContent="center" marginRight={16} opacity={0.72}>
                <UIcon icon={isIOS ? <AppleIcon /> : <GoogleIcon />} color="var(--foregroundSecondary)" />
            </XView>
            <XView>
                <XView {...TextStyles.Caption} color="var(--foregroundSecondary)">{isIOS ? 'Download on the' : 'Get it on'}</XView>
                <XView {...TextStyles.Label1} color="var(--foregroundSecondary)" marginTop={-2}>{isIOS ? 'App Store' : 'Google Play'}</XView>
            </XView>
        </XView>
    );
};

const EmptyScreen = (props: { title: string, subtitle: string, imgSrcStyle: string, children?: JSX.Element }) => {
    return (
        <XView width="100%" alignSelf="center" alignItems="center" justifyContent="center" flexGrow={1} maxWidth={592} paddingHorizontal={16}>
            <div className={cx(emptyScreenImg, props.imgSrcStyle)} />
            <XView {...TextStyles.Title1} marginTop={16} marginBottom={8} color="var(--foregroundPrimary)">{props.title}</XView>
            <p className={emptyScreenSubtitle}>{props.subtitle}</p>
            {props.children || null}
        </XView>
    );
};

export const ContactsFragment = React.memo(() => {
    const client = useClient();
    const refInput = React.useRef<USearchInputRef>(null);
    const { router } = useTabRouter();
    const stackRouter = React.useContext(XViewRouterContext)!;
    const route = React.useContext(XViewRouteContext)!;
    const setStackVisibility = useStackVisibility();
    const [query, setQuery] = React.useState<string>('');
    const didImportContacts = client.usePhonebookWasExported({ fetchPolicy: 'cache-and-network' }).phonebookWasExported;
    const isSearching = query.trim().length > 0;
    const { items: initialItems, cursor: initialAfter } = client.useMyContacts({ first: 20 }, { fetchPolicy: 'cache-and-network' }).myContacts;
    const [items, setItems] = React.useState<MyContacts_myContacts_items_user[]>(initialItems.map(x => x.user));
    const [after, setAfter] = React.useState<string | null>(initialAfter);
    const [loading, setLoading] = React.useState(false);
    const [redirected, setRedirected] = React.useState(false);
    const { listenUpdates } = useLocalContacts();
    const isVisible = useVisibleTab();
    const [searchItemsCount, setSearchItemsCount] = React.useState(0);
    const { selectedIndex, setSelectedIndex } = useListSelection({ disable: !isVisible, maxIndex: isSearching ? searchItemsCount - 1 : items.length - 1 });

    let hasContacts = items.length > 0;

    const handleLoadMore = async () => {
        if (!loading && after) {
            setLoading(true);
            const { items: newItems, cursor } = (await client.queryMyContacts({ first: 10, after }, { fetchPolicy: 'network-only' })).myContacts;
            setItems(prev => prev.concat(newItems.map(x => x.user).filter(x => !prev.some(y => x.id === y.id))));
            setAfter(cursor);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (route.path === '/contacts' && items.length > 0 && !redirected) {
            setTimeout(() => {
                stackRouter.navigate(`/contacts/${items[0].id}`, true);
            }, 100);
            setRedirected(true);
        }
    }, [route.path, items]);

    const onPick = React.useCallback((item: Exclude<GlobalSearch_items, GlobalSearch_items_SharedRoom>) => {
        if (refInput && refInput.current) {
            refInput.current.reset();
        }

        stackRouter.navigate(`/contacts/${item.id}`);
    }, []);

    const onMessagePick = React.useCallback((item: GlobalSearch_items) => {
        const newPath = `/mail/${item.id}`;
        if (route.path === newPath) {
            return;
        }
        if (refInput && refInput.current) {
            refInput.current.reset();
        }
        router.navigate(newPath);
    }, [route.path]);

    React.useEffect(() => {
        if (isVisible) {
            trackEvent('navigate_contacts');
        }
    }, [isVisible]);

    React.useLayoutEffect(
        () => {
            if (hasContacts && !loading) {
                setStackVisibility(true);
            }
        },
        [hasContacts, loading],
    );

    const onlines = React.useContext(MessengerContext).getOnlines();

    React.useEffect(() => {
        return onlines.onSingleChangeChange((user: string, online: boolean) => {
            setItems(current => current.map(item => item.id === user && online !== item.online ? { ...item, online, lastSeen: Date.now().toString() } : item));
        });
    }, [items]);

    React.useEffect(() => {
        return listenUpdates(({ addedUsers, removedUsers }) => {
            setItems(prev => {
                const newItems = addedUsers.concat(prev.filter(x => !removedUsers.some(y => y.id === x.id)));
                if (newItems.length === 0) {
                    setStackVisibility(false);
                }
                return newItems;
            });
        });
    }, []);

    React.useEffect(() => {
        setSelectedIndex(-1);
    }, [query]);

    const noContactsContent = didImportContacts ? (
        <EmptyScreen
            title="No contacts yet"
            subtitle="Invite your contacts to Openland or add people manually from their profiles, and they will appear here"
            imgSrcStyle={noContactsImgSrc}
        />
    ) : (
            <EmptyScreen
                title="Find your friends"
                subtitle="Import contacts from your phone to find people you know on Openland. Install a mobile app and tap “Import contacts”"
                imgSrcStyle={findFriendsImgSrc}
            >
                <XView marginTop={16} flexWrap="wrap" flexDirection="row" justifyContent="center">
                    <MobileAppButton
                        href="https://oplnd.com/ios"
                        isIOS={true}
                        marginTop={16}
                        marginHorizontal={8}
                    />
                    <MobileAppButton
                        href="https://oplnd.com/android"
                        isIOS={false}
                        marginTop={16}
                        marginHorizontal={8}
                    />
                </XView>
            </EmptyScreen>
        );

    const content = hasContacts ? (
        <>
            <USideHeader title="Contacts" />
            <USearchInput
                value={query}
                onChange={setQuery}
                marginHorizontal={16}
                marginBottom={16}
                ref={refInput}
                placeholder="Search"
            />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                {isSearching ? (
                    <ContactsSearchResults
                        query={query}
                        selectedIndex={selectedIndex}
                        onPick={onPick}
                        onMessagePick={onMessagePick}
                        onItemsCountChange={setSearchItemsCount}
                    />
                ) : (
                        <UFlatList
                            loadingHeight={56}
                            padded={false}
                            renderItem={(x, i) => (
                                <ContactsSearchItemRender
                                    item={x}
                                    index={i}
                                    selectedIndex={selectedIndex}
                                    onPick={onPick}
                                    onMessagePick={onMessagePick}
                                />
                            )}
                            loading={loading}
                            items={items}
                            loadMore={handleLoadMore}
                        />
                    )}
            </XView>
        </>
    ) : noContactsContent;

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            {content}
        </XView>
    );
});
