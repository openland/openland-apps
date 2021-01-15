import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZButtonStyle, ZButton } from './ZButton';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 16,
        paddingBottom: 24
    } as ViewStyle,
    avatar: {
        marginBottom: 16,
        alignItems: 'center'
    } as ViewStyle,
    badgeBox: {
        position: 'absolute',
        bottom: 2, right: 2,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: RadiusStyles.Large,
        paddingVertical: 3,
        paddingHorizontal: 8,
    } as ViewStyle,
    badge: {
        ...TextStyles.Label3,
    } as TextStyle,
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    } as ViewStyle,
    titleIconBox: {
        justifyContent: 'center',
        height: 26
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        flexShrink: 1,
        textAlign: 'center'
    } as TextStyle,
    subtitleBox: {
        marginTop: 4,
    } as ViewStyle,
    subtitle: {
        ...TextStyles.Body,
        textAlign: 'center',
    } as TextStyle,
    actionPrimary: {
        marginTop: 24,
    } as ViewStyle,
    actions: {
        marginTop: 16,
        marginBottom: -4,
        flexDirection: 'row',
        justifyContent: 'center'
    } as ViewStyle,
});

interface ZHeroProps {
    photo?: string | null;
    id?: string;
    online?: boolean;
    title: string;
    titleIcon?: NodeRequire;
    titleIconElement?: JSX.Element;
    titleIconRight?: NodeRequire;
    titleIconRightColor?: string;
    titleColor?: string;
    subtitle?: string | null;
    subtitleColor?: string;
    actionPrimary?: {
        title: string;
        style?: ZButtonStyle;
        path?: string;
        onPress?: () => void;
    };
    badge?: string | null;
    children?: any;
}

export const ZHero = React.memo<ZHeroProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { photo, id, online, title, titleIcon, titleIconElement, titleIconRight, titleIconRightColor, titleColor, subtitle, subtitleColor, actionPrimary, badge, children } = props;
    const actions: any[] = [];

    React.Children.forEach(children, (c) => {
        if (c !== null && c !== undefined) {
            actions.push(c);
        }
    });

    return (
        <View style={styles.box}>
            <View style={styles.avatar}>
                <View style={{ position: 'relative' }}>
                    <XPAvatarWithPreview size="xxx-large" photo={photo} id={id} title={title} online={online} />
                    {!!badge && badge.length > 0 && (
                        <View style={[styles.badgeBox, { backgroundColor: theme.backgroundTertiary, borderColor: theme.backgroundPrimary }]}>
                            <Text style={[styles.badge, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                                {badge}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.titleBox}>
                <View style={styles.titleIconBox}>
                    {titleIcon && <Image source={titleIcon} style={{ width: 20, height: 20, marginRight: 4, alignSelf: 'center', tintColor: titleColor || theme.foregroundPrimary }} />}
                    {titleIconElement}
                </View>
                <Text style={[{ color: titleColor || theme.foregroundPrimary }, styles.title]} numberOfLines={2} ellipsizeMode="tail" allowFontScaling={false}>
                    {title}
                </Text>
                <View style={styles.titleIconBox}>
                    {titleIconRight && <Image source={titleIconRight} style={{ width: 16, height: 16, marginLeft: 4, marginTop: 2, alignSelf: 'center', tintColor: titleIconRightColor || theme.foregroundPrimary }} />}
                </View>
            </View>

            {!!subtitle && (
                <View style={styles.subtitleBox}>
                    <Text style={[{ color: subtitleColor || theme.foregroundSecondary }, styles.subtitle]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                        {subtitle}
                    </Text>
                </View>
            )}

            {!!actionPrimary && (
                <View style={styles.actionPrimary}>
                    <ZButton
                        title={actionPrimary.title}
                        style={actionPrimary.style}
                        path={actionPrimary.path}
                        onPress={actionPrimary.onPress}
                        size="large"
                    />
                </View>
            )}

            {actions.length > 0 && (
                <View style={styles.actions}>
                    {actions}
                </View>
            )}
        </View>
    );
});