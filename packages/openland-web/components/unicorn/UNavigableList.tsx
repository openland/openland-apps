import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

export interface UNavigableListProps {
    data: { key: string, data: any }[];
    render: (item: any) => any;
}

export interface UNavigableListRef {
    onPressUp(): void;
    onPressDown(): void;
}

interface ListState {
    focus: number;
    items: { key: string, data: any }[];
}

type ListStateAction =
    { type: 'update', items: { key: string, data: any }[] } |
    { type: 'up' } |
    { type: 'down' };

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
            let newIndex = action.items.findIndex((v) => v.key === focusedId);
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
    background-color: blue;
`;

const focusedStyle = css`
    background-color: red;
`;

const Item = React.memo((props: { focused: boolean, children?: any }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    React.useLayoutEffect(() => {
        if (props.focused) {
            ref.current!.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        }
    }, [props.focused]);
    return (
        <div className={itemStyle + (props.focused ? ' ' + focusedStyle : '')} ref={ref}>
            {props.children}
        </div>
    );
});

export const UNavigableList = React.memo(React.forwardRef((props: UNavigableListProps, ref: React.Ref<UNavigableListRef>) => {
    const [state, dispatch] = React.useReducer(listStateReducer, { items: props.data, focus: 0 });
    if (state.items !== props.data) {
        dispatch({ 'type': 'update', items: props.data });
    }

    React.useImperativeHandle(ref, () => ({
        onPressUp: () => {
            dispatch({ 'type': 'up' });
        },
        onPressDown: () => {
            dispatch({ 'type': 'down' });
        }
    }));
    return (
        <XView
            flexDirection="column"
            alignItems="stretch"
        >
            {state.items.map((v, i) => (
                <Item key={'item-' + v.key} focused={state.focus === i}>
                    {props.render(v.data)}
                </Item>
            ))}
        </XView>
    );
}));