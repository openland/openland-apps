import * as React from 'react';
import { XView, XViewRouterContext, XImage, XViewProps } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { GlobalSearch_items, GlobalSearch_items_SharedRoom } from 'openland-api/spacex.types';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { ContactsSearchResults } from './ContactsSearchResults';
import { useStackVisibility } from 'openland-unicorn/StackVisibilityContext';
import { css, cx } from 'linaria';
import { TextStyles, TextBody } from 'openland-web/utils/TextStyles';
import CycleIcon from 'openland-icons/s/ic-cycle-glyph-24.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

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

export const ContactsFragment = React.memo(() => {
    const refInput = React.useRef<USearchInputRef>(null);
    const isVisible = useVisibleTab();
    React.useEffect(
        () => {
            if (isVisible) {
                trackEvent('navigate_contacts');
            }
        },
        [isVisible],
    );

    const { router } = useTabRouter();
    const stackRouter = React.useContext(XViewRouterContext)!;
    const setStackVisibility = useStackVisibility();
    const [query, setQuery] = React.useState<string>('');
    // const isSearching = query.trim().length > 0;

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

    const hasContacts = true;
    const didImportContacts = false;
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

    React.useLayoutEffect(() => {
        if (hasContacts) {
            setStackVisibility(true);
        }
    }, [hasContacts]);

    const content = hasContacts ? (
        <>
            <USideHeader title="Contacts" />
            <USearchInput
                value={query}
                onChange={setQuery}
                marginHorizontal={16}
                marginBottom={16}
                ref={refInput}
                placeholder="Name or organization"
            />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    {!didImportContacts && (
                        <UListItem
                            icon={<CycleIcon />}
                            iconBackground="var(--accentPrimary)"
                            title="Import contacts"
                            titleStyle={TextStyles.Label1}
                        />
                    )}
                    <ContactsSearchResults variables={{ query: query }} onPick={onPick} onMessagePick={onMessagePick} />
                </XScrollView3>
            </XView>
        </>
    ) : noContactsContent;

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            {content}
        </XView>
    );
});
