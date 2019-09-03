import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { DataSourceFeedPostItem } from 'openland-engines/feed/FeedEngine';

interface FeedPostAsyncProps {
    item: DataSourceFeedPostItem;
}

const FeedPostAsyncRender = XMemo<FeedPostAsyncProps & { theme: ThemeGlobal }>((props) => {
    const { theme, item } = props;
    const { id } = item;

    return (
        <ASFlex backgroundColor={theme.backgroundSecondary}>
            <ASText>{id}</ASText>
        </ASFlex>
    );
});

export const FeedPostAsync = XMemo<FeedPostAsyncProps>((props) => {
    let theme = useThemeGlobal();

    return <FeedPostAsyncRender theme={theme} {...props} />;
});