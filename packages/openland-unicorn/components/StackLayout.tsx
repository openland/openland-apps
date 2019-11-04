import * as React from 'react';
import { StackRouter, StackRouterContext, StackItems } from './StackRouter';
import { PageLayout } from './PageLayout';
import { UnicornContext } from './UnicornContext';
import { XViewRoute, XViewRouteContext } from 'react-mental';

const PageAnimator = React.memo(
    (props: {
        children?: any;
        k: string;
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting';
        dispatch: React.Dispatch<AnimationAction>;
        router: StackRouter;
    }) => {
        console.log('render[' + props.k + ']: ' + props.state);

        React.useLayoutEffect(
            () => {
                if (props.state === 'entering') {
                    setTimeout(() => {
                        props.dispatch({ type: 'entered', key: props.k });
                    }, 250);
                }
                if (props.state === 'exiting') {
                    setTimeout(() => {
                        props.dispatch({ type: 'exited', key: props.k });
                    }, 250);
                }
            },
            [props.state],
        );

        if (props.state === 'hidden') return null;

        return (
            <PageLayout state={props.state} container={props.router.ref}>
                {props.children}
            </PageLayout>
        );
    },
);

type PushAnumationAction = {
    type: 'push';
    key: string;
    query: any;
    id?: string;
    path: string;
    component: any;
};

type AnimationAction =
    | PushAnumationAction
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

type PageState = 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting';

type Page = {
    key: string;
    component: any;
    path: string;
    query: any;
    id?: string;
    state: PageState;
};

type AnimationState = {
    pages: Page[];
};

const createPage = (action: PushAnumationAction, state: PageState): Page => ({
    key: action.key,
    path: action.path,
    query: action.query,
    id: action.id,
    component: action.component,
    state,
});

function initialState(pages: StackItems[]): AnimationState {
    return {
        pages: pages.map((p, i) => ({
            key: p.key,
            id: p.id,
            query: p.query,
            path: p.path,
            component: p.component,
            state: (i === pages.length - 1 ? 'visible' : 'hidden') as PageState,
        })),
    };
}

function animationReducer(state: AnimationState, action: AnimationAction): AnimationState {
    if (action.type === 'push') {
        return {
            pages: [...state.pages, createPage(action, 'mounting')],
        };
    } else if (action.type === 'pop') {
        return {
            pages: state.pages.map((p, i) => {
                if (p.key === action.key) {
                    return { ...p, state: 'exiting' as PageState };
                } else if (state.pages[i + 1] && state.pages[i + 1].key === action.key) {
                    return { ...p, state: 'entering' as PageState };
                }
                return p;
            }),
        };
    } else if (action.type === 'entered') {
        return {
            pages: state.pages.map((p, i) => {
                if (p.key === action.key && p.state === 'entering') {
                    return { ...p, state: 'visible' as PageState };

                    // unmount page when other page is visible
                    // } else if (
                    //     state.pages[i + 1] &&
                    //     state.pages[i + 1].key === action.key &&
                    //     p.state === 'visible'
                    // ) {
                    //     return { ...p, state: 'hidden' as PageState };
                }
                return p;
            }),
        };
    } else if (action.type === 'exited') {
        return {
            pages: state.pages.filter(p => p.key !== action.key),
        };
    } else if (action.type === 'mounted') {
        if (state.pages.find(p => p.state === 'mounting')) {
            return {
                pages: state.pages.map(p => {
                    if (p.state === 'mounting') {
                        return { ...p, state: 'entering' as PageState };
                    }
                    return p;
                }),
            };
        }
        return state;
    } else if (action.type === 'reset') {
        return initialState(action.pages);
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

export const StackLayout = React.memo((props: { router: StackRouter; className?: string }) => {
    let [state, dispatch] = React.useReducer(animationReducer, props.router.pages, initialState);
    const baseRoute = React.useContext(XViewRouteContext)!;

    React.useEffect(() => {
        return props.router.addListener(dispatch);
    });

    React.useLayoutEffect(() => {
        dispatch({ type: 'mounted' });
    });

    return (
        <StackRouterContext.Provider value={props.router}>
            <div key="content" className={props.className} ref={props.router.ref}>
                {state.pages.map(v => (
                    <PageAnimator
                        state={v.state}
                        key={v.key}
                        k={v.key}
                        dispatch={dispatch}
                        router={props.router}
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
            </div>
        </StackRouterContext.Provider>
    );
});
