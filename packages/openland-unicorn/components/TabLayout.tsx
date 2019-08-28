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
    background-color: #F0F2F5;
    pointer-events: none;
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

const TabContainer = React.memo((props: { index: number, router: TabRouter }) => {
    const counterSetter = React.useCallback((c: number) => props.router.setCounter(props.index, c), []);
    const xRouting = React.useMemo(() => ({
        navigate: (to: string) => {
            props.router.reset(to);
        }
    }), []);
    return (
        <CounterContext.Provider value={counterSetter}>
            <XViewRouterContext.Provider value={xRouting}>
                {props.router.tabs[props.index].component}
            </XViewRouterContext.Provider>
        </CounterContext.Provider>
    );
});

export const TabLayout = React.memo((props: { router: TabRouter }) => {
    let layout = useLayout();

    // Two-phase commit for better performance
    let [selected, setSelected] = React.useState(props.router.currentTab);
    let [selectedMounted, setSelectedMounted] = React.useState(props.router.currentTab);
    let currentTab = React.useRef(props.router.currentTab);
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

    const xRouting = React.useMemo(() => ({
        navigate: (to: string) => {
            props.router.navigate(to);
        }
    }), []);

    React.useEffect(() => {
        AppNotifications.setRouter(xRouting);
    }, []);

    return (
        <XViewRouterContext.Provider value={xRouting}>
            <Container>
                <XDialogProviderComponent />
                {layout === 'mobile' ? (
                    <InnerContainer>
                        {props.router.stacks.map((v, i) => (
                            <div key={'tab-' + i} className={selectedMounted === i ? visibleContainer : invisibleContainer}>
                                <XView width="100%" height="100%" flexDirection="row" overflow="hidden" paddingBottom={52} >
                                    <XView key="root" width="100%" height="100%" position="relative" alignItems="flex-start" backgroundColor="#fff">
                                        <TabContainer index={i} router={props.router} />
                                        <XView position="absolute" bottom={-52} left={0} right={0} height={52}>
                                            <TabBarMobile selected={selected} setSelected={setSelectedClb} router={props.router} />
                                        </XView>
                                    </XView>
                                    <StackLayout key="stack" className={containerMobile} router={v} />
                                </XView>
                            </div>
                        ))}
                    </InnerContainer>

                ) : (
                        <>
                            <Banners />
                            <InnerContainer>
                                {props.router.stacks.map((v, i) => (
                                    <div key={'tab-' + i} className={selectedMounted === i ? visibleContainer : invisibleContainer}>
                                        <XView width="100%" height="100%" flexDirection="row" overflow="hidden" paddingLeft={64}>
                                            <XView key="sep1" width={1} backgroundColor="var(--border)" height="100%" />
                                            <XView key="root" maxWidth={370} flexShrink={1} flexGrow={1} height="100%" flexDirection="column">
                                                <XView width="100%" height="100%" position="relative" alignItems="flex-start" backgroundColor="#fff">
                                                    <TabContainer index={i} router={props.router} />
                                                </XView>
                                            </XView>
                                            <XView key="sep2" width={1} height="100%" backgroundColor="var(--border)" />
                                            <StackLayout key="stack" className={containerDesktop} router={v} />
                                        </XView>
                                    </div>
                                ))}
                                <XView position="absolute" top={0} left={0} bottom={0} width={64}>
                                    <TabBarDesktop selected={selected} setSelected={setSelectedClb} router={props.router} />
                                </XView>
                            </InnerContainer>
                        </>
                    )}
            </Container>
        </XViewRouterContext.Provider>
    );
});