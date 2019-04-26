import * as React from 'react';
import { ViewStyle, StyleProp, NativeSyntheticEvent, NativeScrollEvent, processColor, Platform } from 'react-native';
import { ASDataView } from './ASDataView';
import { ASViewListRender } from './platform/ASViewRender';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ASListViewProps {
    style?: StyleProp<ViewStyle>;
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
    loaderColor?: string;
    overflowColor?: string;
    inverted?: boolean;
    dataView: ASDataView<any>;
    fluid?: boolean;
    children?: any;
    headerPadding?: number;
    overscrollCompensation?: boolean;
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
export const ASListView = XMemo<ASListViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    return (
        <ASViewListRender
            style={props.style}
            dataViewKey={props.dataView.key}
            contentPaddingTop={props.contentPaddingTop}
            contentPaddingBottom={props.contentPaddingBottom}
            headerPadding={props.headerPadding}
            overscrollCompensation={props.overscrollCompensation}
            inverted={props.inverted}
            onScroll={props.onScroll}
            overflowColor={props.overflowColor ? processColor(props.overflowColor) : undefined}
            loaderColor={processColor(props.loaderColor ? props.loaderColor : (Platform.OS === 'android' ? theme.loaderColorAndroid : theme.loaderColorIos))}
        />
    );
})