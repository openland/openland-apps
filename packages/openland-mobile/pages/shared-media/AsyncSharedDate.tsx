import * as React from 'react';
import { DataSourceSharedMediaDateItem } from 'openland-engines/messenger/SharedMediaEngine';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';

interface AsyncSharedDateProps {
    item: DataSourceSharedMediaDateItem;
}

export const AsyncSharedDate = React.memo(({ item }: AsyncSharedDateProps) => {
    const theme = useTheme();

    return (
        <ASText
            {...TextStylesAsync.Title2}
            marginTop={11}
            marginBottom={11}
            marginLeft={16}
            marginRight={16}
            color={theme.foregroundPrimary}
        >
            {item.dateLabel}
        </ASText>
    );
});