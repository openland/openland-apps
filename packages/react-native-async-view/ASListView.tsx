import * as React from 'react';
import { ViewStyle, StyleProp, NativeSyntheticEvent, NativeScrollEvent, processColor } from 'react-native';
import { ASDataView } from './ASDataView';
import { ASViewListRender } from './platform/ASViewRender';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SDeferred } from 'react-native-s/SDeferred';

export interface ASListViewProps {
    style?: StyleProp<ViewStyle>;
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
    loaderColor?: string;
    overflowColor?: string;
    inverted?: boolean;
    animated?: boolean;
    dataView: ASDataView<any>;
    fluid?: boolean;
    children?: any;
    headerPadding?: number;
    overscrollCompensation?: boolean;
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
    applyModes?: string[];
}
export const ASListView = React.memo((props: ASListViewProps) => {
    const theme = React.useContext(ThemeContext);
    return (
        <SDeferred>
            <ASViewListRender
                style={props.style}
                dataViewKey={props.dataView.key}
                contentPaddingTop={props.contentPaddingTop}
                contentPaddingBottom={props.contentPaddingBottom}
                headerPadding={props.headerPadding}
                overscrollCompensation={props.overscrollCompensation}
                inverted={props.inverted}
                animated={props.animated}
                onScroll={props.onScroll}
                overflowColor={props.overflowColor ? processColor(props.overflowColor) : undefined}
                loaderColor={processColor(props.loaderColor ? props.loaderColor : theme.foregroundSecondary)}
                applyModes={props.applyModes || []}
            />
        </SDeferred>
    );
});