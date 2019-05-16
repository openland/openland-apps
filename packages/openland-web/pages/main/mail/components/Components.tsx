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
import { PerfCollectorContext } from 'openland-web/perf/PerfCollectorContext';
import { PerfViewer } from 'openland-web/perf/PerfViewer';
import { createPoliteContext } from 'openland-x/createPoliteContext';

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

const { Context, ContextState } = createPoliteContext({
    defaultValue: true,
});

export const IsActivePoliteContext = Context;
export const IsActiveContextState = ContextState;

const isActiveContextsMap = new Map();

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

export const useCheckPerf = ({ name, id }: { name: string; id?: string }) => {
    const perfCollector = React.useContext(PerfCollectorContext);

    const isCached = id && perfCollector.getCachedChatsIds().indexOf(id) !== -1;
    let t0 = performance.now();
    React.useLayoutEffect(() => {
        let t1 = performance.now();

        const _map = perfCollector.getMap();

        let finalName = name;
        if (id) {
            finalName = name + ' ' + id;
        }

        // if (isCached) {
        //     finalName = name + ' ' + id + ' ' + 'cached';
        // }

        perfCollector.setMap({
            ..._map,
            [finalName]: {
                measure: t1 - t0,
                renderCount: _map[finalName] ? _map[finalName].renderCount + 1 : 1,
            },
        });
    }, [Math.random()]);
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
            id: componentProps.id,
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

const CacheComponent = React.memo(
    ({
        Component,
        activeChat,
        componentProps,
    }: {
        Component: any;
        isMobile: boolean;
        activeChat: string | null;
        componentProps: {
            id?: string | null;
        };
    }) => {
        const perfCollector = React.useContext(PerfCollectorContext);
        useCheckPerf({ name: 'CacheComponent' });
        let SIZE_OF_CACHE = 20;

        if (canUseDOM && (window as any).safari !== undefined) {
            SIZE_OF_CACHE = 10;
        }

        const [cachedPropsArray, setCachedProps] = React.useState<
            {
                chatId: string;
                componentProps: {
                    id?: string | null;
                };
            }[]
        >([]);

        React.useEffect(() => {
            perfCollector.setCachedChatsIds(
                cachedPropsArray.map(({ chatId }: { chatId: string }) => {
                    return chatId;
                }),
            );
        }, [cachedPropsArray]);

        const setCachedPropsProc = (
            componentPropsToCache: {
                chatId: string;
                componentProps: {
                    id?: string | null;
                };
            }[],
        ) => {
            setCachedProps(componentPropsToCache);
        };

        if (activeChat) {
            if (cachedPropsArray.filter(({ chatId }) => chatId === activeChat).length === 0) {
                setCachedPropsProc([...cachedPropsArray, { chatId: activeChat, componentProps }]);
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
                            setCachedPropsProc(cachedPropsArray.slice(2));
                        });
                    } else {
                        maybeRequestIdleCallback(() => {
                            setCachedPropsProc(cachedPropsArray.slice(1));
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

            let isActiveState = isActiveContextsMap.get(cached.chatId);
            if (!isActiveState) {
                isActiveState = new IsActiveContextState(false);
                isActiveContextsMap.set(cached.chatId, isActiveState);
            }
            isActiveState.setIsActive(activeChat !== null && activeChat === cached.chatId);

            renderedElements.push(
                <IsActivePoliteContext.Provider key={cached.chatId} value={isActiveState}>
                    <DisplayNone
                        isActive={activeChat !== null && activeChat === cached.chatId}
                        Component={Component}
                        componentProps={cached.componentProps}
                    />
                </IsActivePoliteContext.Provider>,
            );
        }

        return <>{renderedElements}</>;
    },
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
