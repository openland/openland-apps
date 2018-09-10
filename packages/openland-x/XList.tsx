import * as React from 'react';
import Glamorous from 'glamorous';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

interface XListProps {
    rowCount: number;
    rowRenderer: any;
    autoHeight?: boolean;
    rowHeight: number;
}

interface XListInfiniteProps extends XListProps {
    isRowLoaded: any;
    loadMoreRows: any;
}

export interface XListRowRendererProps {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    style: React.CSSProperties;
}

export class XList extends React.Component<XListProps> {
    render() {
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        autoHeight={this.props.autoHeight}
                        rowCount={this.props.rowCount}
                        rowHeight={this.props.rowHeight}
                        rowRenderer={this.props.rowRenderer}
                        width={width}
                        height={height}
                    />
                )}
            </AutoSizer>
        );
    }
}

export class XListInfinite extends React.Component<XListInfiniteProps> {
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
                                width={width}
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={this.props.rowCount}
                                rowHeight={this.props.rowHeight}
                                rowRenderer={this.props.rowRenderer}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        );
    }
}