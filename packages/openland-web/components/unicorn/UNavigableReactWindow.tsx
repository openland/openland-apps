import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { Item } from './UNavigableList';

export interface UNavigableListRef {
    reset(): void;
    onPressUp(): void;
    onPressDown(): void;
    onPressEnter(): boolean;
}

interface UNavigableReactWindowProps<T> {
    paddingVertical?: number;
    data: T[];
    focusedByDefault?: boolean;
    itemSize: number;
    width: number | string;
    height: number;
    overscanCount?: number;
    onSelected: (item: T) => void;
    renderItem: (item: T) => JSX.Element;
}

export const UNavigableReactWindow = React.memo(React.forwardRef(<T extends {}>(props: UNavigableReactWindowProps<T>, ref: React.Ref<UNavigableListRef>) => {
    let { data, itemSize, width, height, overscanCount, renderItem, paddingVertical = 0 } = props;

    let [state, dispatch] = React.useReducer((oldState: { index: number, length: number }, action: { delta?: number, length?: number, reset?: boolean }) => {
        let delta = action.delta !== undefined ? action.delta : 0;
        let length = action.length !== undefined ? action.length : oldState.length;
        return { index: action.reset ? (props.focusedByDefault === false ? -1 : 0) : Math.max(Math.min(length - 1, oldState.index + delta), 0), length };
    }, { index: props.focusedByDefault === false ? -1 : 0, length: data.length });

    if (data.length !== state.length) {
        dispatch({ length: data.length });
    }
    if (state.index >= data.length) {
        dispatch({ delta: data.length - state.index });
    }

    React.useImperativeHandle(ref, () => ({
        onPressUp: () => {
            dispatch({ delta: -1 });
            return true;
        },
        onPressDown: () => {
            dispatch({ delta: 1 });
            return true;
        },
        onPressEnter: () => {
            if (state.index > -1 && state.index < data.length) {
                props.onSelected(props.data[state.index]);
                return true;
            }
            return false;
        },
        reset: () => {
            dispatch({ reset: true });
        }
    }), [props.data, state]);

    let ItemContainer = (pr: { index: number, style: any }) => {
        return (
            <Item
                style={{
                    ...pr.style,
                    marginTop: pr.index === 0 ? paddingVertical : undefined,
                    marginBottom: pr.index === data.length - 1 ? paddingVertical : undefined,
                    top: pr.index !== 0 ? pr.style.top + paddingVertical : undefined
                }}
                focused={pr.index === state.index}
                item={data[pr.index]}
                onSelected={props.onSelected}
            >
                {renderItem(data[pr.index])}
            </Item>
        );
    };

    return (
        <FixedSizeList
            itemCount={data.length}
            itemSize={itemSize}
            overscanCount={overscanCount || 10}
            width={width}
            height={height}
        >
            {ItemContainer}
        </FixedSizeList >
    );
}));