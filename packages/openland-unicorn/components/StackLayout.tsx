import * as React from 'react';
import { StackRouter, StackRouterContext, StackItems } from './StackRouter';
import { PageLayout } from './PageLayout';
import { UnicornContext } from './UnicornContext';
import { XViewRoute, XViewRouteContext, XView } from 'react-mental';
import { VisibleTabContext } from 'openland-unicorn/components/utils/VisibleTabContext';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { debounce } from 'openland-y-utils/timer';
import { css } from 'linaria';
import { TextStyles } from 'openland-web/utils/TextStyles';

const PageAnimator = React.memo(
    (props: {
        children?: any;
        k: string;
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting';
        dispatch: React.Dispatch<AnimationAction>;
        router: StackRouter;
        visible: boolean;
        depth: number;
        removing?: boolean;
    }) => {
        console.log('render[' + props.k + ']: ' + props.state);

        React.useLayoutEffect(
            () => {
                let active = true;
                if (props.state === 'entering') {
                    setTimeout(() => {
                        if (active) {
                            props.dispatch({ type: 'entered', key: props.k });
                        }
                    }, 400);
                }
                if (props.state === 'exiting' || props.removing) {
                    setTimeout(() => {
                        if (active) {
                            props.dispatch({ type: 'exited', key: props.k });
                        }
                    }, 400);
                }
                return () => {
                    active = false;
                };
            },
            [props.state, props.removing],
        );

        let state = props.state;
        if (state === 'hidden' && props.depth >= 2) {
            return null;
        }

        return (
            <PageLayout state={state} container={props.router.ref} visible={props.visible}>
                {props.children}
            </PageLayout>
        );
    },
);

type AnimationAction =
    | {
          type: 'push';
          key: string;
          query: any;
          id?: string;
          path: string;
          component: any;
      }
    | {
          type: 'pop';
          key: string;
      }
    | {
          type: 'entered';
          key: string;
      }
    | {
          type: 'exited';
          key: string;
      }
    | {
          type: 'mounted';
      }
    | {
          type: 'reset';
          pages: StackItems[];
      };

type AnimationState = {
    pages: {
        key: string;
        component: any;
        path: string;
        query: any;
        id?: string;
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting';
        removing?: boolean;
    }[];
};

function initialState(pages: StackItems[]): AnimationState {
    if (pages.length === 0) {
        return { pages: [] };
    } else {
        return {
            pages: pages.map((p, i) => ({
                key: p.key,
                id: p.id,
                query: p.query,
                path: p.path,
                component: p.component,
                state: (i === pages.length - 1 ? 'visible' : 'hidden') as 'visible' | 'hidden',
            })),
        };
    }
}

function animationReducer(state: AnimationState, action: AnimationAction): AnimationState {
    if (action.type === 'push') {
        return {
            pages: [
                ...state.pages,
                {
                    key: action.key,
                    path: action.path,
                    query: action.query,
                    id: action.id,
                    component: action.component,
                    state: 'mounting',
                },
            ],
        };
    } else if (action.type === 'pop') {
        return {
            pages: state.pages.map((v, i) => {
                if (v.key === action.key) {
                    return { ...v, state: 'exiting' as any };
                } else {
                    if (state.pages[i + 1] && state.pages[i + 1].key === action.key) {
                        if (v.state !== 'visible') {
                            return { ...v, state: 'visible' as any };
                        }
                    }
                    return v;
                }
            }),
        };
    } else if (action.type === 'entered') {
        return {
            pages: state.pages.map((v, i) => {
                if (v.key === action.key) {
                    if (v.state === 'entering') {
                        return { ...v, state: 'visible' as any };
                    } else {
                        return v;
                    }
                } else {
                    if (state.pages[i + 1] && state.pages[i + 1].key === action.key) {
                        if (v.state === 'visible') {
                            return { ...v, state: 'hidden' as any };
                        }
                    }
                    return v;
                }
            }),
        };
    } else if (action.type === 'exited') {
        return {
            pages: state.pages.filter(v => v.key !== action.key),
        };
    } else if (action.type === 'mounted') {
        if (state.pages.find(v => v.state === 'mounting')) {
            return {
                pages: state.pages.map(v => {
                    if (v.state === 'mounting') {
                        return { ...v, state: 'entering' as any };
                    } else {
                        return v;
                    }
                }),
            };
        } else {
            return state;
        }
    } else if (action.type === 'reset') {
        let res = initialState(action.pages);
        // do unmount work after new page render, hide old stack till then
        let currentPages = state.pages.filter(p => !p.removing);
        if (currentPages.length) {
            res.pages.unshift(...currentPages.map(p => ({ ...p, removing: true })));
        }
        return res;
    } else {
        throw Error();
    }
}

const PageComponent = React.memo(
    (props: {
        component: any;
        path: string;
        query: any;
        id?: string;
        protocol: string;
        hostName: string;
    }) => {
        let ctx = React.useMemo(
            () => ({
                path: props.path,
                query: props.query,
                id: props.id!,
            }),
            [],
        );
        const xRoute: XViewRoute = React.useMemo(
            () => ({
                href: props.protocol + '://' + props.hostName + props.path,
                protocol: props.protocol,
                hostName: props.hostName,
                path: props.path,
                query: props.query,
            }),
            [],
        );
        return (
            <XViewRouteContext.Provider value={xRoute}>
                <UnicornContext.Provider value={ctx}>{props.component}</UnicornContext.Provider>
            </XViewRouteContext.Provider>
        );
    },
);

const connectingContainerClass = css`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: var(--tintOrange);
    align-items: center;
    padding: 7px 16px 9px;
    opacity: 0;
    transform: scale(0.84) translateY(-8px);
    transition: transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const connectingContainerWrapperClass = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 72px;
    pointer-events: none;
    justify-content: center;
    display: flex;
`;

const ConnectingStatus = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const client = useClient().client;
    React.useEffect(() => {
        const setConnecting = (connecting: boolean) => {
            if (containerRef.current) {
                containerRef.current.style.opacity = connecting ? '1' : '0';
                containerRef.current.style.transform = `scale(${
                    connecting ? 1 : 0.84
                }) translateY(${connecting ? 0 : -8}px)`;
            }
        };
        const setStatusDebaunced = debounce(setConnecting, 500);
        return client.watchStatus(s => {
            setStatusDebaunced(s.status === 'connecting');
        });
    }, []);
    return (
        <div className={connectingContainerWrapperClass}>
            <div className={connectingContainerClass} ref={containerRef}>
                <XView width={16} height={16} marginRight={8} marginTop={1}>
                    <XLoader
                        contrast={true}
                        transparentBackground={true}
                        loading={true}
                        size="small"
                    />
                </XView>
                <XView {...TextStyles.Label1} color="var(--foregroundContrast)">
                    Connecting
                </XView>
            </div>
        </div>
    );
};

interface StackLayoutProps {
    router: StackRouter;
    className?: string;
    visible: boolean;
    placeholder?: React.ReactNode;
}

export const StackLayout = React.memo((props: StackLayoutProps) => {
    let [state, dispatch] = React.useReducer(animationReducer, props.router.pages, initialState);
    const baseRoute = React.useContext(XViewRouteContext)!;
    React.useEffect(() => {
        return props.router.addListener(dispatch);
    }, []);
    React.useLayoutEffect(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => dispatch({ type: 'mounted' })));
    });

    const Placeholder = props.placeholder;

    return (
        <StackRouterContext.Provider value={props.router}>
            <VisibleTabContext.Provider value={props.visible}>
                <div key="content" className={props.className} ref={props.router.ref}>
                    {Placeholder}
                    {state.pages.map((v, i) => (
                        <PageAnimator
                            state={v.state}
                            removing={v.removing}
                            key={v.key}
                            k={v.key}
                            dispatch={dispatch}
                            router={props.router}
                            visible={props.visible}
                            depth={i}
                        >
                            <PageComponent
                                component={v.component}
                                query={v.query}
                                id={v.id}
                                path={v.path}
                                protocol={baseRoute.protocol}
                                hostName={baseRoute.hostName}
                            />
                        </PageAnimator>
                    ))}
                    <ConnectingStatus />
                </div>
            </VisibleTabContext.Provider>
        </StackRouterContext.Provider>
    );
});
