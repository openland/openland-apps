import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export const MentionsDividerView = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View height={40} alignItems="center" justifyContent="center" flexDirection="row">
            <View height={0.5} backgroundColor={theme.border} flexGrow={1} marginHorizontal={16} />
            <Text style={[TextStyles.Caption, { color: theme.foregroundTertiary }]}>
                Not in this group
            </Text>
            <View height={0.5} backgroundColor={theme.border} flexGrow={1} marginHorizontal={16} />
        </View>
    );
});

export type MentionsDividerType = { __typename: 'GlobalDivider' };
export const MentionsDivider: MentionsDividerType = { __typename: 'GlobalDivider' };