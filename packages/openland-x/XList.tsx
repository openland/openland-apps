import * as React from 'react';
import Glamorous from 'glamorous';
import { AutoSizer, InfiniteLoader, List, CellMeasurer, ListRowProps, Index, CellMeasurerCache, IndexRange } from 'react-virtualized';

interface XListProps {
    rowCount: number;
    itemRenderer: any;
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

interface XListInfiniteProps {
    itemRenderer: any;
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    list: any[];
    loadNextPage: any;
}

interface XListInfiniteState {
    rowCount: number;
}

export class XListInfinite extends React.Component<XListInfiniteProps, XListInfiniteState> {
    _cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    constructor(props: XListInfiniteProps) {
        super(props);

        this.state = {
            rowCount: this.props.hasNextPage ? this.props.list.length + 1 : this.props.list.length
        };
    }

    _isRowLoaded = (info: Index) => !this.props.hasNextPage || info.index < this.props.list.length;
    _rowRenderer = (info: ListRowProps) => {
        let content;

        if (!this._isRowLoaded({index: info.index})) {
            content = 'Loading...';
        } else {
            content = this.props.itemRenderer(info.index);
        }

        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={info.key}
                rowIndex={info.index}
                parent={info.parent}
            >
                <div style={info.style}>
                    {content}
                </div>
            </CellMeasurer>
        );
    }

    _loadMoreRows = (info: IndexRange) => {
        if (!this.props.isNextPageLoading) {
            return this.props.loadNextPage(info, () => {
                this.setState({
                    rowCount: this.props.hasNextPage ? this.props.list.length + 1 : this.props.list.length
                });
            });
        }
    }

    render() {
        return (
            <InfiniteLoader
                isRowLoaded={this._isRowLoaded}
                loadMoreRows={this._loadMoreRows}
                rowCount={this.state.rowCount}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                deferredMeasurementCache={this._cache}
                                rowCount={this.state.rowCount}
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