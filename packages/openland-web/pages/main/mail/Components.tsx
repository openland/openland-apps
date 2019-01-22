import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { ComposeFragment } from 'openland-web/fragments/ComposeFragment';
import { RoomsExploreComponent } from 'openland-web/fragments/RoomsExploreComponent';
import { MessengerEmptyFragment } from 'openland-web/fragments/MessengerEmptyFragment';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { RoomProfile } from '../profile/RoomProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import { XThemeDefault } from 'openland-x/XTheme';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { Menu } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { XButton } from 'openland-x/XButton';
import { RoomInviteFromLink } from './RoomInviteFromLink';
import { tabs } from './tabs';

export const OrganizationProfileContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0,
});

const DesktopConversationContainer = Glamorous.div({
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 0,
    overflow: 'hidden',

    backgroundColor: XThemeDefault.backgroundColor,
    maxWidth: 'calc(100% - 344px)',
    '@media (max-width: 1100px)': {
        width: 'calc(100% - 300px)',
        maxWidth: 'calc(100% - 300px)',
    },
    '@media (max-width: 950px)': {
        width: 'calc(100% - 230px)',
        maxWidth: 'calc(100% - 230px)',
    },
});

type PageInnerProps = {
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const ConversationContainerWrapper = ({ tab, conversationId, oid, uid, cid }: PageInnerProps) => {
    const { isMobile } = React.useContext(MobileSidebarContext);

    const ConversationContainerInner = isMobile
        ? ({ children }: any) => <XView width="100%">{children}</XView>
        : DesktopConversationContainer;

    return (
        <ConversationContainerInner>
            {tab === tabs.conversation && conversationId && (
                <MessengerFragment id={conversationId} />
            )}
            {tab === tabs.compose && <ComposeFragment />}
            {tab === tabs.empty && <MessengerEmptyFragment />}
            {tab === tabs.rooms && <RoomsExploreComponent />}
            {tab === tabs.invite && <RoomInviteFromLink />}
            {tab === tabs.organization && oid && (
                <OrganizationProfileContainer>
                    <OrganizationProfile organizationId={oid} />
                </OrganizationProfileContainer>
            )}
            {tab === tabs.user && uid && (
                <OrganizationProfileContainer>
                    <UserProfile userId={uid} />
                </OrganizationProfileContainer>
            )}
            {tab === tabs.chat && cid && (
                <OrganizationProfileContainer>
                    <RoomProfile conversationId={cid} />
                </OrganizationProfileContainer>
            )}
        </ConversationContainerInner>
    );
};

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 344px;
    flex-shrink: 0;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #ececec;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
`;

const DesktopDialogContainer = ({ children }: { children: any }) => {
    return <div className={containerStyle}>{children}</div>;
};

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

const DesktopPageInner = ({ tab, conversationId, oid, uid, cid }: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
            width="100%"
        >
            <DesktopDialogContainer>
                <Menu
                    title={'Messages'}
                    rightContent={
                        <AddButton
                            style="light"
                            path="/mail/new"
                            text="New"
                            icon={<PlusIcon />}
                            size="small"
                        />
                    }
                />
                <DialogListFragment />
            </DesktopDialogContainer>

            <ConversationContainerWrapper {...{ tab, conversationId, oid, uid, cid }} />
        </XView>
    );
};

const MobilePageInner = ({ tab, conversationId, oid, uid, cid }: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
            width="100%"
        >
            {tab === tabs.empty ? (
                <XView width="100%">
                    <Menu
                        title={'Messages'}
                        rightContent={
                            <AddButton
                                style="light"
                                path="/mail/new"
                                text="New"
                                icon={<PlusIcon />}
                                size="small"
                            />
                        }
                    />
                    <DialogListFragment />
                </XView>
            ) : (
                <ConversationContainerWrapper {...{ tab, conversationId, oid, uid, cid }} />
            )}
        </XView>
    );
};

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

export const MessagePageInner = ({ tab, conversationId, oid, uid, cid }: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
            width="100%"
        >
            <PageInner {...{ tab, conversationId, oid, uid, cid }} />
        </XView>
    );
};
