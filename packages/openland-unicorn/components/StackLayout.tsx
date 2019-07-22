import * as React from 'react';
import { StackRouter, StackRouterContext, StackItems } from './StackRouter';
import { PageLayout } from './PageLayout';
import { UnicornContext } from './UnicornContext';
import { XViewRoute, XViewRouteContext } from 'react-mental';

const PageAnimator = React.memo((props: {
    children?: any,
    k: string,
    state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting',
    dispatch: React.Dispatch<AnimationAction>,
    router: StackRouter
}) => {

    console.log('render[' + props.k + ']: ' + props.state);

    React.useLayoutEffect(() => {
        let active = true;
        if (props.state === 'entering') {
            setTimeout(() => {
                if (active) {
                    props.dispatch({ type: 'entered', key: props.k });
                }
            }, 400);
        }
        if (props.state === 'exiting') {
            setTimeout(() => {
                if (active) {
                    props.dispatch({ type: 'exited', key: props.k });
                }
            }, 400);
        }
        return () => {
            active = false;
        };
    }, [props.state]);

    let state = props.state;
    if (state === 'hidden') {
        return null;
    }

    return (
        <PageLayout state={state} container={props.router.ref}>
            {props.children}
        </PageLayout>
    );
});

type AnimationAction = {
    type: 'push';
    key: string;
    query: any;
    id?: string;
    path: string;
    component: any;
} | {
    type: 'pop';
    key: string;
} | {
    type: 'entered';
    key: string;
} | {
    type: 'exited';
    key: string;
} | {
    type: 'mounted'
} | {
    type: 'reset', pages: StackItems[]
};

type AnimationState = {
    pages: {
        key: string;
        component: any;
        path: string;
        query: any;
        id?: string;
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting'
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
                state: (i === pages.length - 1 ? 'visible' : 'hidden') as 'visible' | 'hidden'
            }))
        };
    }
}

function animationReducer(
    state: AnimationState,
    action: AnimationAction
): AnimationState {
    if (action.type === 'push') {
        return { pages: [...state.pages, { key: action.key, path: action.path, query: action.query, id: action.id, component: action.component, state: 'mounting' }] };
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
            })
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
            })
        };
    } else if (action.type === 'exited') {
        return {
            pages: state.pages.filter((v) => v.key !== action.key)
        };
    } else if (action.type === 'mounted') {
        if (state.pages.find((v) => v.state === 'mounting')) {
            return {
                pages: state.pages.map((v) => {
                    if (v.state === 'mounting') {
                        return { ...v, state: 'entering' as any };
                    } else {
                        return v;
                    }
                })
            };
        } else {
            return state;
        }
    } else if (action.type === 'reset') {
        return initialState(action.pages);
    } else {
        throw Error();
    }
}

const PageComponent = React.memo((props: {
    component: any,
    path: string,
    query: any,
    id?: string,
    protocol: string,
    hostName: string
}) => {
    let ctx = React.useMemo(() => ({
        path: props.path,
        query: props.query,
        id: props.id!
    }), []);
    const xRoute: XViewRoute = React.useMemo(() => ({
        href: props.protocol + '://' + props.hostName + props.path,
        protocol: props.protocol,
        hostName: props.hostName,
        path: props.path,
        query: props.query,
    }), []);
    return (
        <XViewRouteContext.Provider value={xRoute}>
            <UnicornContext.Provider value={ctx}>
                {props.component}
            </UnicornContext.Provider>
        </XViewRouteContext.Provider>
    );
});

export const StackLayout = React.memo((props: { router: StackRouter, className?: string }) => {
    let [state, dispatch] = React.useReducer(animationReducer, props.router.pages, initialState);
    const baseRoute = React.useContext(XViewRouteContext)!;
    React.useEffect(() => { return props.router.addListener(dispatch); }, []);
    React.useLayoutEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => dispatch({ type: 'mounted' }))); });
    return (
        <StackRouterContext.Provider value={props.router}>
            <div key="content" className={props.className} ref={props.router.ref}>
                {state.pages.map((v) => (
                    <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch} router={props.router}>
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