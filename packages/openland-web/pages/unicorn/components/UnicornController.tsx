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
    ref: React.RefObject<HTMLDivElement>;
    pages: UnicornPage[] = [];
    private _listeners: ((action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void)[] = [];

    constructor(ref: React.RefObject<HTMLDivElement>) {
        this.ref = ref;
    }

    push = (component: any) => {
        if (!this.ref.current) {
            return;
        }
        let key = uuid();
        this.pages.push({ component, key });
        for (let l of this._listeners) {
            l({ type: 'push', key, component });
        }
    }

    pop = () => {
        if (!this.ref.current) {
            return;
        }
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

const rootClassName = css`
    display: flex;
    width: 100%;
    height: 100%;
`;

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
    transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    pointer-events: none;
`;

const initialClassNameContainer = css`
    opacity: 0.01;
    transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const mountedClassName = css`
    transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

// const visibleClassName = css`
//     transform: translateX(0%);
// `;

const mountedClassNameContainer = css`
    opacity: 0.3;
    transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const exitingClassName = css`
    transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    pointer-events: none;
`;

const exitingClassNameContainer = css`
    opacity: 0.01;
    transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const displayNone = css`
    display: none;
`;

const PageAnimator = React.memo((props: {
    children?: any,
    k: string,
    state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting',
    dispatch: React.Dispatch<AnimationAction>,
    controller: UnicornController
}) => {
    let className;
    let className2;
    let offset = 0;
    if (props.state === 'mounting') {
        className = initialClassName;
        className2 = initialClassNameContainer;
        offset = props.controller.ref.current!.clientWidth;
    } else if (props.state === 'entering' || props.state === 'visible') {
        className = mountedClassName;
        className2 = mountedClassNameContainer;
        offset = 0;
    } else if (props.state === 'exiting') {
        className = exitingClassName;
        className2 = exitingClassNameContainer;
        offset = props.controller.ref.current!.clientWidth;
    } else if (props.state === 'hidden') {
        className = displayNone;
        className2 = displayNone;
        offset = props.controller.ref.current!.clientWidth;
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
            <div className={baseClassName + ' ' + className} style={{ transform: 'translateX(' + offset + 'px)' }}>
                {props.state !== 'hidden' && props.children}
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
        state: 'mounting' | 'entering' | 'visible' | 'hidden' | 'exiting'
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
            pages: state.pages.map((v, i) => {
                if (v.key === action.key) {
                    if (v.state === 'entering') {
                        return { ...v, state: 'visible' as any }
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
    React.useLayoutEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => dispatch({ type: 'mounted' }))); });
    if (layout === 'mobile') {
        return (
            <XView width="100%" height="100%" position="relative" overflow="hidden">
                <XView left={0} top={0} right={0} bottom={50} position="absolute">
                    <XView width="100%" height="100%" position="relative" alignItems="flex-start">
                        {props.root}
                    </XView>
                </XView>
                {state.pages.map((v) => (
                    <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch} controller={props.controller}>
                        {v.component}
                    </PageAnimator>
                ))}
            </XView>
        )
    } else {
        return (
            <XView width="100%" height="100%" flexDirection="row" paddingLeft={50} overflow="hidden">
                <XView maxWidth={370} flexShrink={1} flexGrow={1} height="100%" flexDirection="column">
                    {props.root}
                </XView>
                <XView width={0} flexGrow={1} minWidth={500} height="100%" flexDirection="column" backgroundColor="purple" position="relative">
                    {state.pages.map((v) => (
                        <PageAnimator state={v.state} key={v.key} k={v.key} dispatch={dispatch} controller={props.controller}>
                            {v.component}
                        </PageAnimator>
                    ))}
                </XView>
            </XView>
        )
    }
});

export const UnicornProvider = React.memo((props: { root: any }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    let controller = React.useMemo(() => new UnicornController(ref), []);
    return (
        <div className={rootClassName} ref={ref}>
            <UnicornContext.Provider value={controller}>
                <UnicornContainer root={props.root} controller={controller} />
            </UnicornContext.Provider>
        </div>
    );
});
export const useController = () => React.useContext(UnicornContext);