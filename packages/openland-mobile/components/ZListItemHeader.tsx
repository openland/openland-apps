import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Platform, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZReach } from './ZReach';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingLeft: Platform.OS === 'android' ? 16 : 13,
        paddingRight: 16
    } as ViewStyle,
    body: {
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        paddingLeft: 16,
        paddingRight: 16,
    } as ViewStyle,
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        minWidth: 0,
    } as ViewStyle,
    footer: {
        flexDirection: 'column',
        height: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    } as ViewStyle,
    title: {
        color: '#000000',
        fontSize: 22,
        fontWeight: TextStyles.weight.medium,
        minHeight: 30,
        textAlignVertical: 'center'
    } as TextStyle,
    subtitle: {
        color: Platform.OS === 'android' ? '#99a2b0' : '#5c6a81',
        fontSize: Platform.OS === 'android' ? 14 : 15,
        fontWeight: '400',
        height: Platform.OS === 'android' ? 20 : 20,
        textAlignVertical: 'center',
        marginTop: 0
    } as TextStyle
});

export interface ZListItemHeaderProps {
    photo?: string | null,
    id?: string,
    userId?: string,
    title?: string | null,
    titleIcon?: any;
    titleColor?: string;
    titleLines?: number;
    subtitle?: string | null | JSX.Element,
    subtitleColor?: string,
    path?: string,
    onPress?: () => void;
    action?: string
    score?: number;
    scorePress?: () => void;
}

export const ZListItemHeader = React.memo<ZListItemHeaderProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { photo, id, userId, title, titleIcon, titleColor, titleLines, subtitle, subtitleColor, path, onPress, action, score, scorePress } = props;

    return (
        <>
            {(theme.backgroundSecondary !== theme.backgroundPrimary) && <View backgroundColor={theme.backgroundSecondary} height={1000} marginTop={-1000} />}
            <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
                <View width={86} height={86}>
                    <XPAvatarWithPreview size={86} src={photo} placeholderKey={id} placeholderTitle={title} userId={userId} />
                    {!!score && (
                        <View position="absolute" bottom={-7} left={0} right={0} alignItems="center">
                            <View style={{ borderWidth: 3, borderColor: theme.backgroundSecondary, borderRadius: 16 }}>
                                <ZReach value={score} onPress={scorePress} />
                            </View>
                        </View>
                    )}
                </View>
                <View style={[styles.body, { height: theme.backgroundSecondary === theme.backgroundPrimary ? 94 : 114, paddingBottom: theme.backgroundSecondary === theme.backgroundPrimary ? 0 : 24 }]}>
                    <View style={styles.header}>
                        <View flexDirection="row">
                            {titleIcon && <Image source={titleIcon} style={{ width: 18, height: 18, marginRight: 2, alignSelf: 'center', marginBottom: Platform.OS === 'ios' ? 5 : -3, tintColor: titleColor || '#000' }} />}
                            <Text style={[styles.title, titleColor ? { color: titleColor } : { color: theme.foregroundPrimary }]} numberOfLines={titleLines || 1}>{title}</Text>
                        </View>
                        <Text style={[styles.subtitle, subtitleColor ? { color: subtitleColor } : { color: theme.foregroundPrimary }]} numberOfLines={1}>{subtitle}</Text>
                    </View>
                    {action && (
                        <View style={styles.footer}>
                            <ZRoundedButton title={action} path={path} onPress={onPress} />
                        </View>
                    )}
                </View>
            </View>
        </>
    );
})