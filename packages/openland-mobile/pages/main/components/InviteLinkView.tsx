import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface InviteLinkViewProps {
    link: string;
    onPress?: () => void;
    footer?: string;
}

export const InviteLinkView = React.memo((props: InviteLinkViewProps) => {
    const { link, footer, onPress } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <View style={{ marginVertical: 16 }}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.6} disabled={!onPress}>
                <View
                    style={{
                        marginHorizontal: 16,
                        justifyContent: 'center',
                        height: 48,
                        backgroundColor: theme.backgroundTertiary,
                        paddingHorizontal: 16,
                        borderRadius: RadiusStyles.Medium
                    }}
                >
                    <Text
                        style={{ ...TextStyles.Densed, color: theme.foregroundPrimary }}
                        allowFontScaling={false}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {link}
                    </Text>
                </View>
            </TouchableOpacity>

            {!!footer && (
                <View
                    style={{
                        marginTop: 8,
                        marginHorizontal: 32
                    }}
                >
                    <Text
                        style={{ ...TextStyles.Caption, color: theme.foregroundSecondary }}
                        allowFontScaling={false}
                    >
                        {footer}
                    </Text>
                </View>
            )}
        </View>
    );
});