import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export const MentionsPlaceholderView = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View paddingHorizontal={16} height={40} alignItems="center" justifyContent="center" flexDirection="row">
            <View alignItems="center" justifyContent="center" width={24} height={24} marginRight={16}>
                <Image source={require('assets/ic-at-24.png')} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
            </View>
            <Text style={[TextStyles.Subhead, { flex: 1, color: theme.foregroundSecondary }]}>
                Type to search anyone or anything
            </Text>
        </View>
    );
});

export type MentionsPlaceholderType = { __typename: 'MentionsPlaceholder' };
export const MentionsPlaceholder: MentionsPlaceholderType = { __typename: 'MentionsPlaceholder' };