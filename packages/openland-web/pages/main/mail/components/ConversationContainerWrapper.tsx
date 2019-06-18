import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { MessengerEmptyFragment } from 'openland-web/fragments/MessengerEmptyFragment';
import { OrganizationProfile } from '../../profile/components/OrganizationProfileComponent';
import { RoomProfile } from '../../profile/components/RoomProfileComponent';
import { UserProfile } from '../../profile/components/UserProfileComponent';
import { XThemeDefault } from 'openland-x/XTheme';
import { RoomInviteFromLink } from './RoomInviteFromLink';
import { OrganizationInviteFromLink } from './OrganizationInviteFromLink';
import { tabs } from '../tabs';
import { PerfViewer } from 'openland-web/perf/PerfViewer';
import {
    DeleteUrlAugmentationComponent,
    DeleteMessageComponent,
} from 'openland-web/fragments/MessengerRootComponent';
import { CacheComponent } from './CacheComponent';
import { CommentsNotifications } from '../CommentsNotifications';

export const OrganizationProfileContainer = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    flexShrink: 1,
});

const DesktopConversationContainer = Glamorous.div({
    justifyContent: 'flex-start',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    backgroundColor: XThemeDefault.backgroundColor,
});

type PageInnerProps = {
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const MobileConversationContainer = ({ children }: { children: any }) => (
    <XView flexGrow={1} flexShrink={1}>
        {children}
    </XView>
);

export const ConversationContainerWrapper = ({
    tab,
    conversationId,
    oid,
    uid,
    cid,
}: PageInnerProps) => {
    let pageTitle = tab === tabs.compose ? 'New chat' : undefined;

    if (!canUseDOM) {
        return (
            <>
                <XDocumentHead title={pageTitle} />
                <Scaffold>{}</Scaffold>
            </>
        );
    }

    const isMobile = React.useContext(IsMobileContext);

    const ConversationContainerInner = isMobile
        ? MobileConversationContainer
        : DesktopConversationContainer;

    return (
        <>
            <PerfViewer />
            <ConversationContainerInner>
                <CacheComponent
                    isMobile={isMobile}
                    activeChat={tab === tabs.chat && conversationId ? conversationId : null}
                    Component={MessengerFragment}
                    componentProps={{
                        id: conversationId,
                    }}
                />
                {tab === tabs.notifications && <CommentsNotifications />}
                {tab === tabs.empty && <MessengerEmptyFragment />}
                {tab === tabs.roomInvite && <RoomInviteFromLink />}
                {tab === tabs.organizationInvite && <OrganizationInviteFromLink />}
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
                {tab === tabs.roomProfile && cid && (
                    <OrganizationProfileContainer>
                        <RoomProfile conversationId={cid} />
                    </OrganizationProfileContainer>
                )}
            </ConversationContainerInner>
            <DeleteUrlAugmentationComponent />
            <DeleteMessageComponent />
        </>
    );
};
