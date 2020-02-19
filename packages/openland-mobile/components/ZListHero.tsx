import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Image, Dimensions } from 'react-native';
import { ZButton } from './ZButton';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZReach } from './ZReach';
import { ZListItemBase } from './ZListItemBase';

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
    } as ViewStyle,
    container: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 8,
    } as ViewStyle,
    avatar: {
        width: 72,
        height: 72,
    } as ViewStyle,
    body: {
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: 16,
        width: Dimensions.get('screen').width - 72 - 16 - 16
    } as ViewStyle,
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        textAlignVertical: 'center',
        flexShrink: 1,
    } as TextStyle,
    subtitle: {
        ...TextStyles.Subhead,
        textAlignVertical: 'center',
        marginTop: 4
    } as TextStyle,
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
    titleIcon?: NodeRequire;
    titleIconElement?: JSX.Element;
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
    path?: string;
    pathParams?: any;
}

export const ZListHero = React.memo<ZListHeroProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { photo, id, title, titleIcon, titleIconElement, titleColor, subtitle, subtitleColor, action, score, path, pathParams } = props;
    const colorTitle = titleColor ? titleColor : theme.foregroundPrimary;
    const colorSubtitle = subtitleColor ? subtitleColor : theme.foregroundTertiary;

    const content = (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <XPAvatarWithPreview size="x-large" photo={photo} id={id} title={title} />
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
                        {titleIconElement}
                        <Text style={[styles.title, { color: colorTitle }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                    </View>
                    <Text style={[styles.subtitle, { color: colorSubtitle }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{subtitle}</Text>

                    {action && (
                        <View style={styles.footer}>
                            <ZButton title={action.title} path={action.path} onPress={action.onPress} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    if (!!path) {
        return (
            <View style={styles.wrapper}>
                <ZListItemBase path={path} pathParams={pathParams} height={null} separator={false}>
                    {content}
                </ZListItemBase>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {content}
        </View>
    );
});