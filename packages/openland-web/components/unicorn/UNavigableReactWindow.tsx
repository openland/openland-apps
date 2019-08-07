import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { Item } from './UNavigableList';

export interface UNavigableListRef {
    onPressUp(): void;
    onPressDown(): void;
    onPressEnter(): boolean;
}

export const UNavigableReactWindow = React.memo(React.forwardRef(<T extends {}>(props: { data: T[], itemSize: number, width: number | string, height: number, overscanCount?: number, onSelected: (item: T) => void, renderItem: (item: T) => JSX.Element }, ref: React.Ref<UNavigableListRef>) => {
    let { data, itemSize, width, height, overscanCount, renderItem } = props;

    let [selectedIndex, dispatch] = React.useReducer((oldState: number, delta: number) => {
        return Math.max(Math.min(data.length - 1, oldState + delta), 0);
    }, 0);

    React.useImperativeHandle(ref, () => ({
        onPressUp: () => {
            dispatch(-1);
            return true;
        },
        onPressDown: () => {
            dispatch(1);
            return true;
        },
        onPressEnter: () => {
            if (selectedIndex > -1) {
                props.onSelected(props.data[selectedIndex]);
                return true;
            }
            return false;
        },
    }), [props.data, selectedIndex]);

    let ItemContainer = (pr: { index: number, style: any }) => {
        return (
            <Item style={pr.style} focused={pr.index === selectedIndex} item={data[pr.index]} onSelected={props.onSelected}>
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