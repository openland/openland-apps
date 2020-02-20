import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { Item } from './UNavigableList';

export interface UNavigableListRef {
    reset(): void;
    onPressUp(): void;
    onPressDown(): void;
    onPressEnter(): boolean;
}

export const UNavigableReactWindow = React.memo(
    React.forwardRef(
        <T extends { selectable?: boolean }>(
            props: {
                data: T[];
                focusedByDefault?: boolean;
                itemSize: number;
                width: number | string;
                height: number;
                overscanCount?: number;
                onSelected: (item: T) => void;
                renderItem: (item: T) => JSX.Element;
            },
            ref: React.Ref<UNavigableListRef>,
        ) => {
            let { data, itemSize, width, height, overscanCount, renderItem } = props;

            const findSelectable = React.useCallback(
                (index: number, delta: number) => {
                    let res = index;

                    if (data[index].selectable === false) {
                        const current = index + delta;

                        if (current < 0 || current > data.length - 1) {
                            res -= delta;
                        } else {
                            res += delta;
                        }
                    }

                    return res;
                },
                [data],
            );

            let [state, dispatch] = React.useReducer(
                (
                    oldState: { index: number; length: number; startScrolling: boolean },
                    action: {
                        delta?: number;
                        length?: number;
                        reset?: boolean;
                        startScrolling?: boolean;
                        focusedIndex?: number;
                    },
                ) => {
                    const delta = action.delta !== undefined ? action.delta : 0;
                    const length = action.length !== undefined ? action.length : oldState.length;
                    const startScrolling = !oldState.startScrolling;
                    return {
                        index: action.focusedIndex
                            ? action.focusedIndex
                            : action.reset
                            ? props.focusedByDefault === false
                                ? -1
                                : findSelectable(0, 1)
                            : findSelectable(
                                  Math.max(Math.min(length - 1, oldState.index + delta), 0),
                                  delta,
                              ),
                        length,
                        startScrolling,
                    };
                },
                {
                    index: props.focusedByDefault === false ? -1 : findSelectable(0, 1),
                    length: data.length,
                    startScrolling: false,
                },
            );

            if (data.length !== state.length) {
                dispatch({ length: data.length });
            }
            if (state.index >= data.length) {
                dispatch({ delta: data.length - state.index });
            }

            React.useImperativeHandle(
                ref,
                () => ({
                    onPressUp: () => {
                        dispatch({ delta: -1, startScrolling: false });
                        return true;
                    },
                    onPressDown: () => {
                        dispatch({ delta: 1, startScrolling: false });
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
                        dispatch({ reset: true, startScrolling: false });
                    },
                }),
                [props.data, state],
            );

            let ItemContainer = (pr: { index: number; style: any }) => {
                return (
                    <Item
                        style={pr.style}
                        focused={pr.index === state.index}
                        item={data[pr.index]}
                        onSelected={props.onSelected}
                        startScrolling={state.startScrolling}
                        selectable={data[pr.index].selectable}
                        onMouseEnter={() => dispatch({ focusedIndex: pr.index })}
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
                    onScroll={() => {
                        if (!state.startScrolling) {
                            dispatch({ startScrolling: true });
                        }
                    }}
                >
                    {ItemContainer}
                </FixedSizeList>
            );
        },
    ),
);
