import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { FeedDataSourceItem } from 'openland-engines/feed/FeedEngine';

interface FeedItemAsyncProps {
    item: FeedDataSourceItem;
}

const FeedItemAsyncRender = XMemo<FeedItemAsyncProps & { theme: ThemeGlobal }>((props) => {
    const { theme, item } = props;
    const { id } = item;

    return (
        <ASFlex backgroundColor={theme.backgroundSecondary}>
            <ASText>{id}</ASText>
        </ASFlex>
    );
});

export const FeedItemAsync = XMemo<FeedItemAsyncProps>((props) => {
    let theme = useThemeGlobal();

    return <FeedItemAsyncRender theme={theme} {...props} />;
});