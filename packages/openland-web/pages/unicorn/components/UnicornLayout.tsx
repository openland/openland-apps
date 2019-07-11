import * as React from 'react';
import { useLayout } from './LayoutContext';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { PageLayout } from './PageLayout';
import { UnicornController, UnicornContext } from './UnicornController';

const rootClassName = css`
    display: flex;
    width: 100%;
    height: 100%;
`;

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

const PageAnimator = React.memo((props: {
    children?: any,
    k: string,
    state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting',
    dispatch: React.Dispatch<AnimationAction>,
    controller: UnicornController
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
        <PageLayout state={state} container={props.controller.ref}>
            {props.children}
        </PageLayout>
    );
});

type AnimationAction = {
    type: 'push';
    key: string;
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
};

type AnimationState = {
    pages: {
        key: string;
        component: any;
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting'
    }[];
};

function animationReducer(
    state: AnimationState,
    action: AnimationAction
): AnimationState {
    if (action.type === 'push') {
        return { pages: [...state.pages, { key: action.key, component: action.component, state: 'mounting' }] };
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
    } else {
        throw Error();
    }
}

const UnicornContainer = React.memo((props: { root: any, controller: UnicornController }) => {
    let layout = useLayout();
    let [state, dispatch] = React.useReducer(animationReducer, { pages: [] });
    React.useEffect(() => { return props.controller.addListener(dispatch); }, []);
    React.useLayoutEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => dispatch({ type: 'mounted' }))); });
    if (layout === 'mobile') {
        return (
            <XView width="100%" height="100%" position="relative" overflow="hidden">
                <XView key="root" left={0} top={0} right={0} bottom={0} position="absolute">
                    <XView width="100%" height="100%" position="relative" paddingBottom={52} alignItems="flex-start" backgroundColor="#fff">
                        {props.root}
                    </XView>
                </XView>
                <div key="content" className={containerMobile} ref={props.controller.ref}>
                    {state.pages.map((v) => (
                        <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch} controller={props.controller}>
                            {v.component}
                        </PageAnimator>
                    ))}
                </div>
            </XView>
        );
    } else {
        return (
            <XView width="100%" height="100%" flexDirection="row" overflow="hidden" paddingLeft={64}>
                <XView width={1} backgroundColor="rgba(120, 128, 143, 0.08)" height="100%" />
                <XView key="root" maxWidth={370} flexShrink={1} flexGrow={1} height="100%" flexDirection="column">
                    <XView width="100%" height="100%" position="relative" alignItems="flex-start" backgroundColor="#fff">
                        {props.root}
                    </XView>
                </XView>
                <XView width={1} height="100%" backgroundColor="rgba(0, 0, 0, 0.08)" />
                <div key="content" className={containerDesktop} ref={props.controller.ref}>
                    {state.pages.map((v) => (
                        <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch} controller={props.controller}>
                            {v.component}
                        </PageAnimator>
                    ))}
                </div>
            </XView>
        );
    }
});

export const UnicornLayout = React.memo((props: { root: any }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    let controller = React.useMemo(() => new UnicornController(ref), []);
    return (
        <div className={rootClassName}>
            <UnicornContext.Provider value={controller}>
                <UnicornContainer
                    root={props.root}
                    controller={controller}
                />
            </UnicornContext.Provider>
        </div>
    );
});