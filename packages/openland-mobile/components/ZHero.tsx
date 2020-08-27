import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZButtonStyle, ZButton } from './ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
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
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
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
    titleColor?: string;
    subtitle?: string | null;
    actionPrimary?: {
        title: string;
        style?: ZButtonStyle;
        path?: string;
        onPress?: () => void;
    };
    children?: any;
}

export const ZHero = React.memo<ZHeroProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { photo, id, online, title, titleIcon, titleIconElement, titleColor, subtitle, actionPrimary, children } = props;
    const actions: any[] = [];

    React.Children.forEach(children, (c) => {
        if (c !== null && c !== undefined) {
            actions.push(c);
        }
    });

    return (
        <View style={styles.box}>
            <View style={styles.avatar}>
                <XPAvatarWithPreview size="xxx-large" photo={photo} id={id} title={title} online={online} />
            </View>

            <View style={styles.titleBox}>
                {titleIcon && <Image source={titleIcon} style={{ width: 20, height: 20, marginRight: 4, alignSelf: 'center', tintColor: titleColor || theme.foregroundPrimary }} />}
                {titleIconElement}
                <Text style={[{ color: titleColor || theme.foregroundPrimary }, styles.title]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                    {title}
                </Text>
            </View>

            {!!subtitle && (
                <View style={styles.subtitleBox}>
                    <Text style={[{ color: theme.foregroundSecondary }, styles.subtitle]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
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