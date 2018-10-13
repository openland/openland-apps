import * as React from 'react';
import { ViewStyle, StyleProp, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ASDataView } from './ASDataView';
import { ASViewListRender } from './platform/ASViewRender';

export interface ASListViewProps {
    style?: StyleProp<ViewStyle>;
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
    inverted?: boolean;
    dataView: ASDataView<any>;
    fluid?: boolean;
    children?: any;
    headerPadding?: number;
    overscrollCompensation?: boolean;
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
export class ASListView extends React.PureComponent<ASListViewProps> {
    render() {
        return (
            <ASViewListRender
                style={this.props.style}
                dataViewKey={this.props.dataView.key}
                contentPaddingTop={this.props.contentPaddingTop}
                contentPaddingBottom={this.props.contentPaddingBottom}
                headerPadding={this.props.headerPadding}
                overscrollCompensation={this.props.overscrollCompensation}
                inverted={this.props.inverted}
                onScroll={this.props.onScroll}
            />
        );
    }
}