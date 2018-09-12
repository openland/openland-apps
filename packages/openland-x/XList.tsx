import * as React from 'react';
import Glamorous from 'glamorous';
import { AutoSizer, InfiniteLoader, List, CellMeasurer, ListRowProps } from 'react-virtualized';
import { CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';

interface XListProps {
    rowCount: number;
    itemRenderer: any;
    autoHeight?: boolean;
}

interface XListInfiniteProps extends XListProps {
    isRowLoaded: any;
    loadMoreRows: any;
}

export class XList extends React.Component<XListProps> {
    _cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    _rowRenderer = (info: ListRowProps) => {
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={info.key}
                rowIndex={info.index}
                parent={info.parent}
            >
                <div style={info.style}>
                    {this.props.itemRenderer(info.index)}
                </div>
            </CellMeasurer>
        );
    }

    render() {
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        deferredMeasurementCache={this._cache}
                        autoHeight={this.props.autoHeight}
                        rowCount={this.props.rowCount}
                        rowHeight={this._cache.rowHeight}
                        rowRenderer={this._rowRenderer}
                        width={width}
                        height={height}
                    />
                )}
            </AutoSizer>
        );
    }
}

export class XListInfinite extends React.Component<XListInfiniteProps> {
    _cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    _rowRenderer = (info: ListRowProps) => {
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={info.key}
                rowIndex={info.index}
                parent={info.parent}
            >
                <div style={info.style}>
                    {this.props.itemRenderer(info.index)}
                </div>
            </CellMeasurer>
        );
    }

    render() {
        return (
            <InfiniteLoader
                isRowLoaded={this.props.isRowLoaded}
                loadMoreRows={this.props.loadMoreRows}
                rowCount={this.props.rowCount}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                deferredMeasurementCache={this._cache}
                                autoHeight={this.props.autoHeight}
                                rowCount={this.props.rowCount}
                                rowHeight={this._cache.rowHeight}
                                rowRenderer={this._rowRenderer}
                                width={width}
                                height={height}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        );
    }
}