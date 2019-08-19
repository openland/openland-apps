import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZReach } from './ZReach';
import { ZIconButton } from './ZIconButton';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: 'row',
        paddingVertical: 8,
    } as ViewStyle,
    avatar: {
        width: 72,
        height: 72
    } as ViewStyle,
    body: {
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: 16,
    } as ViewStyle,
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        minWidth: 0,
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        textAlignVertical: 'center'
    } as TextStyle,
    subtitle: {
        ...TextStyles.Subhead,
        textAlignVertical: 'center',
        marginTop: 4
    } as TextStyle,
    iconRight: {
        marginRight: -10,
        marginLeft: 6,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    footer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 16
    } as ViewStyle
});

export interface ZListHeroProps {
    photo?: string | null;
    id?: string;
    title?: string | null;
    titleIcon?: any;
    titleColor?: string;
    subtitle?: string | null | JSX.Element;
    subtitleColor?: string;
    action?: {
        title: string;
        path?: string;
        onPress?: () => void;
    };
    score?: {
        value: number;
        onPress?: () => void;
    };
    iconRight?: {
        src: NodeRequire;
        path?: string;
        onPress?: () => void;
    };
}

export const ZListHero = React.memo<ZListHeroProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { photo, id, title, titleIcon, titleColor, subtitle, subtitleColor, action, score, iconRight } = props;
    const colorTitle = titleColor ? titleColor : theme.foregroundPrimary;
    const colorSubtitle = subtitleColor ? subtitleColor : theme.foregroundTertiary;

    return (
        <>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <XPAvatarWithPreview size="x-large" src={photo} placeholderKey={id} placeholderTitle={title} />
                    {score && (
                        <View position="absolute" bottom={-7} left={0} right={0} alignItems="center">
                            <View style={{ borderWidth: 3, borderColor: theme.backgroundPrimary, borderRadius: RadiusStyles.Large }}>
                                <ZReach value={score.value} onPress={score.onPress} />
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.body}>
                    <View style={styles.header} justifyContent={!action ? 'center' : undefined}>
                        <View flexDirection="row">
                            {titleIcon && <Image source={titleIcon} style={{ width: 20, height: 20, marginRight: 4, alignSelf: 'center', tintColor: colorTitle }} />}
                            <Text style={[styles.title, { color: colorTitle }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                        </View>
                        <Text style={[styles.subtitle, { color: colorSubtitle }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{subtitle}</Text>

                        {action && (
                            <View style={styles.footer}>
                                <ZRoundedButton title={action.title} path={action.path} onPress={action.onPress} />
                            </View>
                        )}
                    </View>

                    {iconRight && (
                        <View style={styles.iconRight}>
                            <ZIconButton src={iconRight.src} path={iconRight.path} onPress={iconRight.onPress} />
                        </View>
                    )}
                </View>
            </View>
        </>
    );
});