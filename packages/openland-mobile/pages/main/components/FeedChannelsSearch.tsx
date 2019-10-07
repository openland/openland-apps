import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SRouter } from 'react-native-s/SRouter';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

interface FeedChannelsSearchProps {
    query: string;
    router: SRouter;
    emptyView?: JSX.Element;
}

const FeedChannelsSearchInner = (props: FeedChannelsSearchProps) => {
    return null;
};

export const FeedChannelsSearch = XMemo<FeedChannelsSearchProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const query = props.query.trim();

    return (
        <SScrollView>
            <ASSafeAreaContext.Consumer>
                {area => (
                    <View minHeight={Dimensions.get('screen').height - area.top - area.bottom} backgroundColor={theme.backgroundPrimary}>
                        <React.Suspense fallback={SNativeConfig.loader}>
                            {query.length > 0 && <FeedChannelsSearchInner {...props} />}
                            {query.length <= 0 && props.emptyView}
                        </React.Suspense>
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </SScrollView>
    );
});