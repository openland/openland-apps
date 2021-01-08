import * as React from 'react';
import { TabRouter } from './TabRouter';
import { useLayout } from './utils/LayoutContext';
import { InnerContainer, Container } from './Container';
import { XView, XViewRouterContext } from 'react-mental';
import { StackLayout } from './StackLayout';
import { css } from 'linaria';
import { TabBarDesktop } from './TabBarDesktop';
import { TabBarMobile } from './TabBarMobile';
import { CounterContext } from './CounterContext';
import { Banners } from 'openland-unicorn/Banner';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';
import { VisibleTabContext } from 'openland-unicorn/components/utils/VisibleTabContext';
import { MessengerPlaceholderFragment } from 'openland-web/fragments/chat/MessengerPlaceholderFragment';
import { XLoader } from 'openland-x/XLoader';
import { StackRouter } from './StackRouter';
import { StackVisibilityContext } from 'openland-unicorn/StackVisibilityContext';

const containerMobile = css`
    display: flex;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    pointer-events: none;
    z-index: 2;
`;

const containerDesktop = css`
    position: relative;
    display: flex;
    width: 0px;
    flex-grow: 1;
    min-width: 500px;
    height: 100%;
    flex-direction: column;
    background-color: var(--backgroundPrimary);
    z-index: 2;
`;

const visibleContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    background-color: var(--backgroundPrimary);
`;

const invisibleContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: none;
`;

const TabContainer = React.memo(
    (props: { activeIndex: number; index: number; router: TabRouter, setStackVisibility: (visible: boolean) => void }) => {
        const counterSetter = React.useCallback(
            (c: number) => props.router.setCounter(props.index, c),
            [],
        );
        const xRouting = React.useMemo(
            () => ({
                navigate: (to: string, replace?: boolean) => {
                    if (replace === false) {
                        props.router.navigate(to);
                    } else {
                        props.router.reset(to);
                    }
                },
            }),
            [],
        );
        return (
            <CounterContext.Provider value={counterSetter}>
                <XViewRouterContext.Provider value={xRouting}>
                    <StackVisibilityContext.Provider value={props.setStackVisibility}>
                        <VisibleTabContext.Provider value={props.activeIndex === props.index}>
                            <React.Suspense fallback={<XLoader loading={true} />}>
                                {props.router.tabs[props.index].component}
                            </React.Suspense>
                        </VisibleTabContext.Provider>
                    </StackVisibilityContext.Provider>
                </XViewRouterContext.Provider>
            </CounterContext.Provider>
        );
    },
);

export interface TabRouterContextProps {
    router: TabRouter;
    setTab(id: number): void;
}

const TabRouterContext = React.createContext<TabRouterContextProps | null>(null);
export const useTabRouter = () => React.useContext(TabRouterContext)!;

interface GlobalSearchContextProps {
    value: string;
    onChange: (e: string) => void;
}

const GlobalSearchContext = React.createContext<GlobalSearchContextProps | null>(null);
export const useGlobalSearch = () => React.useContext(GlobalSearchContext);

const StackContent = React.memo((props: {
    layout: 'mobile' | 'desktop',
    selectedMounted: number,
    index: number,
    selected: number,
    router: TabRouter,
    stackRouter: StackRouter,
    setSelectedClb: (id: number) => void
}) => {
    const { layout, index, selected, router, stackRouter, selectedMounted, setSelectedClb } = props;
    const [stackVisible, setStackVisible] = React.useState(!router.tabs[index].isStackHidden);

    return layout === 'mobile' ? (
        <div
            key={'tab-' + index}
            className={
                selectedMounted === index
                    ? visibleContainer
                    : invisibleContainer
            }
        >
            <XView
                width="100%"
                height="100%"
                flexDirection="row"
                overflow="hidden"
                paddingBottom={52}
            >
                <XView
                    key="root"
                    width="100%"
                    height="100%"
                    position="relative"
                    alignItems="flex-start"
                    backgroundColor="var(--backgroundPrimary)"
                >
                    <TabContainer
                        index={index}
                        router={props.router}
                        activeIndex={selected}
                        setStackVisibility={setStackVisible}
                    />
                    <XView
                        position="absolute"
                        bottom={-52}
                        left={0}
                        right={0}
                        height={52}
                    >
                        <TabBarMobile
                            selected={selected}
                            setSelected={setSelectedClb}
                            router={props.router}
                        />
                    </XView>
                </XView>
                <StackLayout
                    key="stack"
                    className={containerMobile}
                    visible={selectedMounted === index}
                    router={stackRouter}
                />
            </XView>
        </div>
    ) : (
            <div
                key={'tab-' + index}
                className={
                    selectedMounted === index
                        ? visibleContainer
                        : invisibleContainer
                }
            >
                <XView
                    width="100%"
                    height="100%"
                    flexDirection="row"
                    overflow="hidden"
                    paddingLeft={64}
                >
                    <XView
                        key="sep1"
                        width={1}
                        zIndex={3}
                        backgroundColor="var(--border)"
                        height="100%"
                    />
                    <XView
                        key="root"
                        maxWidth={stackVisible ? 370 : undefined}
                        flexShrink={1}
                        flexGrow={1}
                        zIndex={3}
                        height="100%"
                        flexDirection="column"
                    >
                        <XView
                            width="100%"
                            height="100%"
                            position="relative"
                            alignItems="flex-start"
                            backgroundColor="var(--backgroundPrimary)"
                        >
                            <TabContainer
                                index={index}
                                router={props.router}
                                activeIndex={selected}
                                setStackVisibility={setStackVisible}
                            />
                        </XView>
                    </XView>
                    {stackVisible ? (
                        <>
                            <XView
                                key="sep2"
                                width={1}
                                zIndex={3}
                                height="100%"
                                backgroundColor="var(--border)"
                            />
                            <StackLayout
                                key="stack"
                                className={containerDesktop}
                                visible={selectedMounted === index}
                                router={stackRouter}
                                placeholder={
                                    stackRouter.rootPath === '/mail' ? (
                                        <MessengerPlaceholderFragment />
                                    ) : null
                                }
                            />
                        </>
                    ) : null}
                </XView>
            </div>
        );
});

export const TabLayout = React.memo((props: { router: TabRouter }) => {
    let layout = useLayout();

    const [globalSearchQuery, setGlobalSearchQuery] = React.useState('');

    // Two-phase commit for better performance
    const [selected, setSelected] = React.useState(props.router.currentTab);
    const [selectedMounted, setSelectedMounted] = React.useState(props.router.currentTab);
    const currentTab = React.useRef(props.router.currentTab);
    const setSelectedClb = React.useCallback((id: number) => {
        props.router.switchTab(id);
        currentTab.current = id;
        setSelected(id);
        setTimeout(() => {
            setSelectedMounted(id);
        }, 20);
    }, []);

    // Subscribe to history navigation
    React.useEffect(() => {
        if (props.router.onChangeListener) {
            throw Error('Tab router can work only be attached to a single layout');
        }
        props.router.onChangeListener = (id: number) => {
            setSelected(id);
            setTimeout(() => {
                setSelectedMounted(id);
            }, 20);
        };
        return () => {
            props.router.onChangeListener = undefined;
        };
    }, []);

    const xRouting = React.useMemo(
        () => ({
            navigate: (to: string) => {
                props.router.navigate(to);
            },
        }),
        [],
    );

    const xNotificationRouting = React.useMemo(
        () => ({
            navigate: (to: string, replace?: boolean) => {
                if (replace === false) {
                    props.router.navigate(to);
                } else {
                    props.router.reset(to);
                }
            },
        }),
        [],
    );

    React.useEffect(() => {
        AppNotifications.setRouter(xNotificationRouting);
    }, []);

    return (
        <TabRouterContext.Provider value={{ router: props.router, setTab: setSelectedClb }}>
            <XViewRouterContext.Provider value={xRouting}>
                <GlobalSearchContext.Provider value={{ value: globalSearchQuery, onChange: setGlobalSearchQuery }}>
                    <Container>
                        <XDialogProviderComponent />

                        {layout === 'desktop' && <Banners />}

                        <InnerContainer>
                            {props.router.stacks.map((v, i) => (
                                <StackContent
                                    key={i}
                                    selected={selected}
                                    layout={layout}
                                    selectedMounted={selectedMounted}
                                    setSelectedClb={setSelectedClb}
                                    index={i}
                                    router={props.router}
                                    stackRouter={v}
                                />
                            ))}
                            {layout === 'desktop' && (
                                <XView position="absolute" top={0} left={0} bottom={0} width={64} zIndex={2}>
                                    <TabBarDesktop
                                        selected={selected}
                                        setSelected={setSelectedClb}
                                        router={props.router}
                                        xRouter={xRouting}
                                    />
                                </XView>
                            )}
                        </InnerContainer>
                    </Container>
                </GlobalSearchContext.Provider>
            </XViewRouterContext.Provider>
        </TabRouterContext.Provider>
    );
});
