import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

export const MentionsDividerView = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();

    return (
        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ height: 0.5, backgroundColor: theme.border, flexGrow: 1, marginHorizontal: 16 }} />
            <Text style={[TextStyles.Caption, { color: theme.foregroundTertiary }]}>
                {t('mentionsMissing', 'Not in this group')}
            </Text>
            <View style={{ height: 0.5, backgroundColor: theme.border, flexGrow: 1, marginHorizontal: 16 }} />
        </View>
    );
});

export type MentionsDividerType = { __typename: 'GlobalDivider' };
export const MentionsDivider: MentionsDividerType = { __typename: 'GlobalDivider' };