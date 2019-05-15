import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
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
        return this.props.isActive !== props.isActive;
    }
    render() {
        return (
            <this.props.Component {...this.props.componentProps} isActive={this.props.isActive} />
        );
    }
}

export const useCheckPerf = ({ name, props }: { name: string; props?: any }) => {
    // let t0 = performance.now();
    // React.useLayoutEffect(() => {
    //     let t1 = performance.now();
    //     console.log(`${name} rerender: ` + (t1 - t0) + ` milliseconds.`);
    //     if (props) {
    //         console.log(props);
    //     }
    // }, [Math.random()]);
};

const DisplayNone = React.memo(
    ({
        isActive,
        Component,
        componentProps,
    }: {
        isActive: boolean;
        Component: any;
        componentProps: any;
    }) => {
        useCheckPerf({
            name: 'DisplayNone',
            props: {
                isActive,
                Component,
                componentProps,
            },
        });
        return (
            <div className={cx(displayNoneCommonClassName, !isActive && displayNoneClassName)}>
                <ShouldUpdateComponent
                    Component={Component}
                    componentProps={componentProps}
                    isActive={isActive}
                />
            </div>
        );
    },
);

const maybeRequestIdleCallback = (cb: Function) => {
    if (window && (window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(cb);
    } else {
        cb();
    }
};

const CacheComponent = ({
    Component,
    activeChat,
    componentProps,
}: {
    Component: any;
    isMobile: boolean;
    activeChat: string | null;
    componentProps: any;
}) => {
    useCheckPerf({ name: 'CacheComponent' });
    let SIZE_OF_CACHE = 20;

    if (canUseDOM && (window as any).safari !== undefined) {
        SIZE_OF_CACHE = 10;
    }

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
                if (
                    cachedPropsArray.length - 1 > SIZE_OF_CACHE &&
                    cachedPropsArray[0].chatId !== activeChat &&
                    cachedPropsArray[1].chatId !== activeChat
                ) {
                    maybeRequestIdleCallback(() => {
                        setCachedProps(cachedPropsArray.slice(2));
                    });
                } else {
                    maybeRequestIdleCallback(() => {
                        setCachedProps(cachedPropsArray.slice(1));
                    });
                }
            }
        }
    }, [activeChat]);

    // if (true) {
    //     return (
    //         <IsActiveContext.Provider value={true}>
    //             {activeChat && <Component {...componentProps} isActive={true} />}{' '}
    //         </IsActiveContext.Provider>
    //     );
    // }

    const renderedElements = [];

    for (let i = 0; i < cachedPropsArray.length; i++) {
        const cached = cachedPropsArray[i];

        renderedElements.push(
            <IsActiveContext.Provider
                key={cached.chatId}
                value={activeChat !== null && activeChat === cached.chatId}
            >
                <DisplayNone
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
    useCheckPerf({ name: 'ConversationContainerWrapper' });
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
        </>
    );
};
