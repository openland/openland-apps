import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Dimensions } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'stretch',
        flexDirection: 'row'
    } as ViewStyle,
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        alignSelf: 'center',
        paddingHorizontal: 16,
        maxWidth: '100%',
    } as ViewStyle,
    info: {
        flexGrow: 1,
        flexDirection: 'column',
        paddingLeft: 12
    } as ViewStyle,
    title: {
        ...TextStyles.Label2,
    } as TextStyle,
    subtitle: {
        ...TextStyles.Caption,
    } as TextStyle
});

interface AuthorHeaderProps {
    avatar: {
        photo?: string | null;
        id: string;
        title: string;
    };
    proBadge?: boolean;
    title: string;
    subtitle: string;
    onPress: () => void;
}

const LABEL_MAX_WIDTH = Dimensions.get('screen').width - 185;

export const EntityHeader = React.memo((props: AuthorHeaderProps) => {
    const theme = React.useContext(ThemeContext);
    const { avatar, title, subtitle, onPress, proBadge } = props;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            <View style={styles.box}>
                <ZAvatar size="small" photo={avatar.photo} id={avatar.id} />
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={[styles.title, { color: theme.foregroundPrimary, maxWidth: LABEL_MAX_WIDTH }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            allowFontScaling={false}
                        >
                            {title}
                        </Text>
                        {proBadge && (
                            <View style={{ marginLeft: 8 }}>
                                <PremiumBadge/>
                            </View>
                        )}
                    </View>
                    <Text
                        style={[styles.subtitle, { color: theme.foregroundSecondary, maxWidth: LABEL_MAX_WIDTH }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {subtitle}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});