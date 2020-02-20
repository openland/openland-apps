import * as React from 'react';
import { css, cx } from 'linaria';

export interface UNavigableListProps {
    data: { key: string; data: any }[];
    render: (item: any) => any;
    onSelected: (item: any) => void;
}

export interface UNavigableListRef {
    onPressUp(): void;
    onPressDown(): void;
    onPressEnter(): boolean;
}

interface ListState {
    focus: number;
    items: { key: string; data: any }[];
}

type ListStateAction =
    | { type: 'update'; items: { key: string; data: any }[] }
    | { type: 'up' }
    | { type: 'down' };

function listStateReducer(state: ListState, action: ListStateAction): ListState {
    if (action.type === 'update') {
        if (state.items.length > 0 && action.items.length > 0) {
            // Adjust focus
            let focus = state.focus;
            if (focus >= action.items.length) {
                focus = action.items.length - 1;
            }

            // Try to keep current selected item if possible
            let focusedId = state.items[focus].key;
            let newIndex = action.items.findIndex(v => v.key === focusedId);
            if (newIndex >= 0) {
                focus = newIndex;
            }
            return { focus, items: action.items };
        } else {
            return { focus: 0, items: action.items };
        }
    } else if (action.type === 'up') {
        if (state.items.length > 0 && state.focus > 0) {
            return { focus: state.focus - 1, items: state.items };
        }
    } else if (action.type === 'down') {
        if (state.items.length > 0 && state.focus < state.items.length - 1) {
            return { focus: state.focus + 1, items: state.items };
        }
    }
    return state;
}

const itemStyle = css`
    display: flex;
    background-color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #f0f2f5;
    }
    &:active {
        background-color: #ebedf0;
    }
`;

const focusedStyle = css`
    background-color: #f0f2f5;
`;

const nonSelectableStyle = css`
    background-color: var(--backgroundPrimary)!important;
    cursor: initial;
`;

export const Item = React.memo(
    (props: {
        style?: any;
        focused: boolean;
        children?: any;
        item: any;
        onSelected: (item: any) => void;
        startScrolling?: boolean;
        selectable?: boolean;
        onMouseEnter?: () => void;
    }) => {
        let ref = React.useRef<HTMLDivElement>(null);
        React.useLayoutEffect(
            () => {
                if (props.focused && !props.startScrolling) {
                    ref.current!.scrollIntoView({
                        behavior: 'auto',
                        block: 'nearest',
                    });
                }
            },
            [props.focused],
        );
        const callback = React.useCallback((e: React.MouseEvent) => {
            props.onSelected(props.item);
        }, []);
        return (
            <div
                className={cx(itemStyle, props.focused && focusedStyle, props.selectable === false && nonSelectableStyle)}
                style={props.style}
                ref={ref}
                onClick={props.selectable === false ? undefined : callback}
                onMouseEnter={props.onMouseEnter}
            >
                {props.children}
            </div>
        );
    },
);

export const UNavigableList = React.memo(
    React.forwardRef((props: UNavigableListProps, ref: React.Ref<UNavigableListRef>) => {
        const [state, dispatch] = React.useReducer(listStateReducer, {
            items: props.data,
            focus: 0,
        });
        if (state.items !== props.data) {
            dispatch({ type: 'update', items: props.data });
        }
        const lastState = React.useRef(state);
        lastState.current = state;

        React.useImperativeHandle(ref, () => ({
            onPressUp: () => {
                dispatch({ type: 'up' });
            },
            onPressDown: () => {
                dispatch({ type: 'down' });
            },
            onPressEnter: () => {
                if (lastState.current.items.length > 0) {
                    let selected = lastState.current.items[lastState.current.focus].data;
                    props.onSelected(selected);
                    return true;
                }
                return false;
            },
        }));
        return (
            <>
                {state.items.map((v, i) => (
                    <Item
                        key={'item-' + v.key}
                        focused={state.focus === i}
                        item={v.data}
                        onSelected={props.onSelected}
                    >
                        {props.render(v.data)}
                    </Item>
                ))}
            </>
        );
    }),
);
