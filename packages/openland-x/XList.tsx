import * as React from 'react';
import Glamorous from 'glamorous';
import { AutoSizer, InfiniteLoader, List, Index, CellMeasurer } from 'react-virtualized';
import { MeasuredCellParent, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';

interface XListProps {
    rowCount: number;
    row: any;
    autoHeight?: boolean;
}

interface XListInfiniteProps extends XListProps {
    isRowLoaded: any;
    loadMoreRows: any;
}

interface XListRowRendererProps {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    style: React.CSSProperties;
    parent: MeasuredCellParent;
}

export class XList extends React.Component<XListProps> {
    _cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    _rowRenderer = (info: XListRowRendererProps) => {
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={info.key}
                rowIndex={info.index}
                parent={info.parent}
            >
                <div style={info.style}>
                    {this.props.row(info.index)}
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

    _rowRenderer = (info: XListRowRendererProps) => {
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={info.key}
                rowIndex={info.index}
                parent={info.parent}
            >
                <div style={info.style}>
                    {this.props.row(info.index)}
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