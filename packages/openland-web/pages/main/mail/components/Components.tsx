import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { ComposeFragment } from 'openland-web/fragments/ComposeFragment';
import { RoomsExploreComponent } from 'openland-web/fragments/RoomsExploreComponent';
import { MessengerEmptyFragment } from 'openland-web/fragments/MessengerEmptyFragment';
import { OrganizationProfile } from '../../profile/components/OrganizationProfileComponent';
import { RoomProfile } from '../../profile/components/RoomProfileComponent';
import { UserProfile } from '../../profile/components/UserProfileComponent';
import { XThemeDefault } from 'openland-x/XTheme';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { Menu } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { XButton } from 'openland-x/XButton';
import { RoomInviteFromLink } from './RoomInviteFromLink';
import { tabs } from '../tabs';

export const OrganizationProfileContainer = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    flexShrink: 0,
});

const DesktopConversationContainer = Glamorous.div({
    justifyContent: 'flex-start',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
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
    <XView flexGrow={1}>{children}</XView>
);

const displayNoneCommonClassName = css`
    height: 100%;
    display: flex;
    flex-grow: 1;
`;

const displayNoneClassName = css`
    display: none;
`;

type ShouldUpdateComponentT = {
    Component: any;
    componentProps: any;
    isActive: boolean;
};

export const IsActiveContext = React.createContext<boolean | null>(null);

class ShouldUpdateComponent extends React.Component<ShouldUpdateComponentT> {
    shouldComponentUpdate(props: any) {
        return this.props.isActive && props.isActive;
    }
    render() {
        return <this.props.Component {...this.props.componentProps} isActive={true} />;
    }
}

const DisplayNone = ({
    isActive,
    Component,
    componentProps,
}: {
    isActive: boolean;
    Component: any;
    componentProps: any;
}) => {
    return (
        <div className={cx(displayNoneCommonClassName, !isActive && displayNoneClassName)}>
            <ShouldUpdateComponent
                Component={Component}
                componentProps={componentProps}
                isActive={isActive}
            />
        </div>
    );
};

const SIZE_OF_CACHE = 20;

const CacheComponent = ({
    Component,
    isMobile,
    activeChat,
    componentProps,
}: {
    Component: any;
    isMobile: boolean;
    activeChat: string | null;
    componentProps: any;
}) => {
    const [cachedPropsArray, setCachedProps] = React.useState<
        {
            chatId: string;
            componentProps: Object;
        }[]
    >([]);

    if (activeChat) {
        if (cachedPropsArray.filter(({ chatId }) => chatId === activeChat).length === 0) {
            setCachedProps([...cachedPropsArray, { chatId: activeChat, componentProps }]);
        }
    }

    React.useEffect(() => {
        if (activeChat) {
            if (
                cachedPropsArray.length > SIZE_OF_CACHE &&
                cachedPropsArray[0].chatId !== activeChat
            ) {
                setCachedProps(cachedPropsArray.slice(1));
            }
        }
    }, [activeChat]);

    if ((window as any).safari !== undefined && !isMobile) {
        return (
            <IsActiveContext.Provider value={true}>
                {activeChat && <Component {...componentProps} isActive={true} />}{' '}
            </IsActiveContext.Provider>
        );
    }

    const renderedElements = [];

    for (let i = 0; i < cachedPropsArray.length; i++) {
        const cached = cachedPropsArray[i];

        renderedElements.push(
            <IsActiveContext.Provider
                key={cached.chatId}
                value={activeChat !== null && activeChat === cached.chatId}
            >
                <DisplayNone
                    id={cached.chatId}
                    isActive={activeChat !== null && activeChat === cached.chatId}
                    Component={Component}
                    componentProps={cached.componentProps}
                />
            </IsActiveContext.Provider>,
        );
    }

    return <>{renderedElements}</>;
};

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
            <ConversationContainerInner>
                <CacheComponent
                    isMobile={isMobile}
                    activeChat={tab === tabs.chat && conversationId ? conversationId : null}
                    Component={MessengerFragment}
                    componentProps={{
                        id: conversationId,
                    }}
                />

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
                {tab === tabs.roomProfile && cid && (
                    <OrganizationProfileContainer>
                        <RoomProfile conversationId={cid} />
                    </OrganizationProfileContainer>
                )}
            </ConversationContainerInner>
        </>
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
            <div
                style={{
                    display: tab === tabs.empty ? 'none' : 'flex',
                }}
            >
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
            </div>
            <div
                style={{
                    display: tab !== tabs.empty ? 'none' : 'flex',
                }}
            >
                <ConversationContainerWrapper {...{ tab, conversationId, oid, uid, cid }} />
            </div>
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
