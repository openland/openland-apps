import * as React from 'react';
import { XView, XViewRouterContext, XImage, XViewProps, XViewRouteContext } from 'react-mental';
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
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { useLocalContacts } from 'openland-y-utils/contacts/LocalContacts';

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
    background: url(https://cdn.openland.com/shared/art/art-find-friends.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-find-friends.png) 1x, url(https://cdn.openland.com/shared/art/art-find-friends@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-find-friends@3x.png) 3x);
`;

const noContactsImgSrc = css`
    background: url(https://cdn.openland.com/shared/art/art-shared.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-shared.png) 1x, url(https://cdn.openland.com/shared/art/art-shared@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-shared@3x.png) 3x);
`;

const MobileAppButton = (props: { image: string, isIOS: boolean } & XViewProps) => {
    const { image, ...other } = props;
    const onClick = React.useCallback(() => {
        trackEvent('app_download_action', {
            os: props.isIOS ? 'ios' : 'android',
            app_platform: 'mobile',
        });
    }, []);

    return (
        <XView as="a" target="_blank" hoverOpacity={0.8} hoverTextDecoration="none" onClick={onClick} {...other}>
            <XImage width={200} height={56} src={props.image} />
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

export const ContactsFragmentComponent = React.memo(() => {
    const client = useClient();
    const refInput = React.useRef<USearchInputRef>(null);
    const { router } = useTabRouter();
    const stackRouter = React.useContext(XViewRouterContext)!;
    const route = React.useContext(XViewRouteContext)!;
    const setStackVisibility = useStackVisibility();
    const [query, setQuery] = React.useState<string>('');
    // TODO: add fetching when import is ready
    const didImportContacts = true;
    const isSearching = query.trim().length > 0;
    const { items: initialItems, cursor: initialAfter } = client.useMyContacts({ first: 20 }, { fetchPolicy: 'network-only' }).myContacts;
    const [items, setItems] = React.useState<MyContacts_myContacts_items_user[]>(initialItems.map(x => x.user));
    const { selectedIndex } = useListSelection({ maxIndex: items.length - 1 });
    const [after, setAfter] = React.useState<string | null>(initialAfter);
    const [loading, setLoading] = React.useState(false);
    const [redirected, setRedirected] = React.useState(false);
    const { localContacts } = useLocalContacts();
    let hasContacts = items.length > 0;

    const handleLoadMore = async () => {
        if (!loading && after) {
            setLoading(true);
            const { items: newItems, cursor } = (await client.queryMyContacts({ first: 10, after }, { fetchPolicy: 'network-only' })).myContacts;
            setItems(prev => prev.concat(newItems.map(x => x.user)));
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
        if (refInput && refInput.current) {
            refInput.current.reset();
        }
        router.navigate(`/mail/${item.id}`);
    }, []);

    React.useEffect(() => {
        trackEvent('navigate_contacts');
    }, []);

    React.useLayoutEffect(
        () => {
            if (hasContacts && !loading) {
                setStackVisibility(true);
            }
        },
        [hasContacts, loading],
    );

    // TODO: Remove when subscription is ready
    React.useEffect(() => {
        setItems(prev => {
            let filtered = prev.filter(user => localContacts[user.id] !== 'removed');
            if (filtered.length === 0) {
                setStackVisibility(false);
            }
            return filtered;
        });
    }, [localContacts]);

    const noContactsContent = didImportContacts ? (
        <EmptyScreen
            title="Find your friends"
            subtitle="Import contacts from your phone to find people you know on Openland. Install a mobile app and tap “Import contacts”"
            imgSrcStyle={findFriendsImgSrc}
        >
            <XView marginTop={16} flexWrap="wrap" flexDirection="row" justifyContent="center">
                <MobileAppButton
                    href="https://oplnd.com/ios"
                    image="/static/X/apps-icons/app-store-light@2x.png"
                    isIOS={true}
                    marginTop={16}
                    marginHorizontal={8}
                />
                <MobileAppButton
                    href="https://oplnd.com/android"
                    image="/static/X/apps-icons/google-play-light@2x.png"
                    isIOS={false}
                    marginTop={16}
                    marginHorizontal={8}
                />
            </XView>
        </EmptyScreen>
    ) : (
            <EmptyScreen
                title="No contacts yet"
                subtitle="Invite your contacts to Openland or add people manually from their profiles, and they will appear here"
                imgSrcStyle={noContactsImgSrc}
            />
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

export const ContactsFragment = React.memo(() => {
    const isVisible = useVisibleTab();
    // TODO: remove isVisible when subscriptions are ready
    return isVisible ? <ContactsFragmentComponent /> : <XLoader loading={true} />;
});
