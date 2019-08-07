import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { Item } from './UNavigableList';

export const UNavigableReactWindow = <T extends {}>(props: { data: T[], itemSize: number, width: number, height: number, overscanCount?: number, renderItem: (item: T) => JSX.Element }) => {
    let { data, itemSize, width, height, overscanCount, renderItem } = props;
    // let [selectedIndex, setSelectedIndex] = React.useState(-1);

    let ItemContainer = (pr: { index: number }) => {
        return (
            <Item focused={false} item={data[pr.index]} onSelected={() => false}>
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
};