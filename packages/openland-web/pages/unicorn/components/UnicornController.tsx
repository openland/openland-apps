import * as React from 'react';
import uuid from 'uuid';
import { useLayout } from './LayoutContext';
import { XView } from 'react-mental';
import { css } from 'linaria';

export interface UnicornPage {
    key: string;
    component: any;
}

export class UnicornController {
    pages: UnicornPage[] = [];
    private _listeners: ((action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void)[] = [];

    push = (component: any) => {
        let key = uuid();
        this.pages.push({ component, key });
        for (let l of this._listeners) {
            l({ type: 'push', key, component });
        }
    }

    pop = () => {
        if (this.pages.length > 0) {
            let r = this.pages.splice(this.pages.length - 1, 1);
            for (let l of this._listeners) {
                l({ type: 'pop', key: r[0].key });
            }
        }
    }

    addListener = (handler: (action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void) => {
        this._listeners.push(handler);
        return () => {
            this._listeners.splice(this._listeners.indexOf(handler), 1);
        }
    }
}

const UnicornContext = React.createContext<UnicornController>(undefined as any);

const baseClassName = css`
    position: absolute;
    background-color: white;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    will-change: transform;
`;

const baseClassNameContainer = css`
    position: absolute;
    background-color: black;
    opacity: 0.3;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    will-change: opacity;
`;

const initialClassName = css`
    transform: translateX(100%);
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    pointer-events: none;
`;

const initialClassNameContainer = css`
    opacity: 0;
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const mountedClassName = css`
    transform: translateX(0%);
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const mountedClassNameContainer = css`
    opacity: 0.3;
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const exitingClassName = css`
    transform: translateX(100%);
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    pointer-events: none;
`;

const exitingClassNameContainer = css`
    opacity: 0.0;
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const PageAnimator = React.memo((props: {
    children?: any,
    k: string,
    state: 'mounting' | 'entering' | 'visible' | 'exiting',
    dispatch: React.Dispatch<AnimationAction>
}) => {

    let className;
    let className2;
    if (props.state === 'mounting') {
        className = initialClassName;
        className2 = initialClassNameContainer;
    } else if (props.state === 'entering' || props.state === 'visible') {
        className = mountedClassName;
        className2 = mountedClassNameContainer;
    } else if (props.state === 'exiting') {
        className = exitingClassName;
        className2 = exitingClassNameContainer;
    } else {
        className = '';
    }

    console.log('render[' + props.k + ']: ' + props.state);

    React.useEffect(() => {
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

    return (
        <>
            <div className={baseClassNameContainer + ' ' + className2} />
            <div className={baseClassName + ' ' + className}>
                {props.children}
            </div>
        </>
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
        state: 'mounting' | 'entering' | 'visible' | 'exiting'
    }[];
}

function animationReducer(
    state: AnimationState,
    action: AnimationAction
): AnimationState {
    if (action.type === 'push') {
        return { pages: [...state.pages, { key: action.key, component: action.component, state: 'mounting' }] };
    } else if (action.type === 'pop') {
        return {
            pages: state.pages.map((v) => {
                if (v.key === action.key) {
                    return { ...v, state: 'exiting' as any }
                } else {
                    return v;
                }
            })
        }
    } else if (action.type === 'entered') {
        return {
            pages: state.pages.map((v) => {
                if (v.key === action.key) {
                    if (v.state === 'entering') {
                        return { ...v, state: 'visible' as any }
                    } else {
                        return v;
                    }
                } else {
                    return v;
                }
            })
        }
    } else if (action.type === 'exited') {
        return {
            pages: state.pages.filter((v) => v.key !== action.key)
        }
    } else if (action.type === 'mounted') {
        if (state.pages.find((v) => v.state === 'mounting')) {
            return {
                pages: state.pages.map((v) => {
                    if (v.state === 'mounting') {
                        return { ...v, state: 'entering' as any }
                    } else {
                        return v;
                    }
                })
            }
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
    React.useLayoutEffect(() => { setTimeout(() => dispatch({ type: 'mounted' }), 10); });
    if (layout === 'mobile') {
        return (
            <XView width="100%" height="100%" position="relative">
                <XView left={0} top={0} right={0} bottom={50} position="absolute">
                    <XView width="100%" height="100%" position="relative" alignItems="flex-start">
                        {props.root}
                    </XView>
                </XView>
                {state.pages.map((v) => (
                    <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch}>
                        {v.component}
                    </PageAnimator>
                ))}
            </XView>
        )
    } else {
        return (
            <XView width="100%" height="100%" flexDirection="row" paddingLeft={50}>
                <XView maxWidth={370} flexShrink={1} flexGrow={1} height="100%" flexDirection="column">
                    {props.root}
                </XView>
                <XView width={0} flexGrow={1} minWidth={500} height="100%" flexDirection="column" backgroundColor="purple" position="relative">
                    {state.pages.map((v) => (
                        <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch}>
                            {v.component}
                        </PageAnimator>
                    ))}
                </XView>
            </XView>
        )
    }
});

export const UnicornProvider = React.memo((props: { root: any }) => {
    let controller = React.useMemo(() => new UnicornController(), []);
    return (
        <UnicornContext.Provider value={controller}>
            <UnicornContainer root={props.root} controller={controller} />
        </UnicornContext.Provider>
    );
});
export const useController = () => React.useContext(UnicornContext);