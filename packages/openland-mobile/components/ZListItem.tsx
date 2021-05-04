import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch, Image, Clipboard, TextStyle, Platform, Linking, ViewStyle } from 'react-native';
import { ZText } from './ZText';
import ActionSheet from './ActionSheet';
import { ZAvatar } from './ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import Toast from 'openland-mobile/components/Toast';

export interface ZListItemProps {
    leftAvatar?: { photo?: string | null, id?: string, title?: string };
    leftIcon?: any | null;
    leftIconColor?: string;
    leftIconView?: JSX.Element;
    rightElement?: JSX.Element;
    separator?: boolean | null;
    title?: string | null;
    subTitle?: string | any | null;
    text?: string | null;
    textStyle?: TextStyle;
    description?: string;
    descriptionColor?: string;
    descriptionIcon?: any;
    toggle?: boolean | null;
    toggleDisabled?: boolean | null;
    checkmark?: boolean | null;
    checkmarkStyle?: ViewStyle;
    checkmarkType?: 'radio' | 'checkbox';
    onToggle?: (value: boolean) => void;
    path?: string;
    pathParams?: any;
    pathRemove?: boolean;
    pathPresent?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    appearance?: 'default' | 'secondary' | 'action' | 'danger';
    multiline?: boolean;
    linkify?: boolean;
    copy?: boolean;
    textToCopy?: string | null;
    small?: boolean;
    tall?: boolean;
}

const LeftIcon = (props: { theme: ThemeGlobal, src: any, flatIcon?: boolean, appearance?: 'default' | 'secondary' | 'action' | 'danger', leftIconColor?: string }) => {
    const { theme, src, flatIcon, appearance, leftIconColor } = props;

    if (flatIcon) {
        return (
            <View style={{ width: 24, height: 24, alignContent: 'center', justifyContent: 'center', marginLeft: 16, alignSelf: 'center' }}>
                <Image source={src} resizeMode="contain" fadeDuration={0} style={{ width: 24, height: 24, alignSelf: 'center', tintColor: theme.foregroundSecondary }} />
            </View>
        );
    }

    let backgroundColor = leftIconColor || (appearance === 'danger' ? theme.accentNegative : (theme.foregroundContrast === theme.accentPrimary ? theme.tintBlue : theme.accentPrimary));
    let tintColor = null;
    if (appearance === 'secondary') {
        backgroundColor = theme.backgroundTertiary;
        tintColor = theme.foregroundTertiary;
    }

    return (
        <View style={{ width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center', backgroundColor, marginLeft: 16, alignSelf: 'center' }}>
            <Image source={src} resizeMode="contain" fadeDuration={0} style={{ width: 24, height: 24, alignSelf: 'center', tintColor: tintColor || theme.foregroundContrast }} />
        </View>
    );
};

const LeftIconViewWrapper = (props: { children: any }) => {
    return (
        <View style={{ width: 40, height: 40, alignContent: 'center', justifyContent: 'center', marginLeft: 16, alignSelf: 'center' }}>
            {props.children}
        </View>
    );
};

class ZListItemComponent extends React.PureComponent<ZListItemProps & { theme: ThemeGlobal }> {
    handleOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.linkify && this.props.text) {
            this.openLink(this.props.text);
        }
    }

    handleOnLongPress = () => {
        if (this.props.onLongPress) {
            this.props.onLongPress();
        }
        const textToCopy = this.props.textToCopy || this.props.text;
        if (this.props.copy && textToCopy) {
            ActionSheet.builder()
                .action('Copy', () => {
                    Clipboard.setString(textToCopy);
                    Toast.showCopied();
                }, undefined, require('assets/ic-copy-24.png'))
                .show(true);
        }
    }

    openLink = async (text: string) => {
        const { link } = preprocessText(text)[0];
        if (link && await Linking.canOpenURL(link)) {
            await Linking.openURL(link);
        }
    }

    render() {
        const { theme } = this.props;

        const showCheckmark = (this.props.checkmark !== undefined && this.props.checkmark !== null);
        let checkmarkEnabled = !!this.props.checkmark;
        let toggleValue: boolean | undefined = this.props.toggle ? this.props.toggle : undefined;

        const enabled = !!this.props.copy || !!this.props.onPress || !!this.props.onLongPress || !!this.props.path;
        const linkify = (this.props.linkify === true || (this.props.linkify === undefined && !this.props.onPress && !this.props.path));
        const descriptionColor = this.props.descriptionColor ? this.props.descriptionColor : theme.foregroundTertiary;
        const isBig = this.props.leftIconView || this.props.subTitle || this.props.leftAvatar || this.props.leftIconColor || (this.props.leftIcon && !this.props.small);
        const height = this.props.multiline ? null : ((isBig || this.props.tall) ? 56 : 48);

        const switchTintColor = theme.accentPrimary.toLowerCase() === '#ffffff' ? theme.foregroundSecondary : theme.accentPrimary;

        return (
            <ZListItemBase
                onPress={this.handleOnPress}
                onLongPress={this.handleOnLongPress}
                enabled={enabled}
                separator={this.props.separator === true}
                path={this.props.path}
                pathParams={this.props.pathParams}
                pathRemove={this.props.pathRemove}
                pathPresent={this.props.pathPresent}
                height={height}
            >
                {this.props.leftIcon && <LeftIcon theme={theme} src={this.props.leftIcon} flatIcon={this.props.small} leftIconColor={this.props.leftIconColor} appearance={this.props.appearance} />}
                {!!this.props.leftIconView && <LeftIconViewWrapper>{this.props.leftIconView}</LeftIconViewWrapper>}
                {this.props.leftAvatar && <View style={{ paddingLeft: 16, alignSelf: 'center' }}><ZAvatar size="medium" {...this.props.leftAvatar} /></View>}
                <View style={{ paddingHorizontal: 16, paddingVertical: this.props.multiline ? 3 : undefined, flexGrow: 1, flex: 1, justifyContent: 'center' }}>
                    {this.props.title && <Text style={{ ...TextStyles.Caption, color: theme.foregroundSecondary, marginTop: 2, marginBottom: -2 }} allowFontScaling={false}>{this.props.title.toLocaleLowerCase()}</Text>}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ZText
                            linkify={linkify}
                            style={[{
                                ...((!isBig || this.props.small) ? TextStyles.Body : TextStyles.Label1),
                                color: this.props.appearance === 'action' ? theme.accentPrimary
                                    : this.props.appearance === 'danger' ? theme.accentNegative
                                        : theme.foregroundPrimary,
                                textAlignVertical: 'center',
                                ...!this.props.descriptionIcon ? { flexGrow: 1, flexBasis: 0 } : {},
                                alignSelf: !this.props.title || this.props.leftAvatar ? 'center' : 'flex-start',
                            }, this.props.textStyle]}
                            numberOfLines={this.props.multiline ? undefined : 1}
                            text={this.props.text}
                        />
                        {this.props.descriptionIcon && (
                            <View style={{ marginLeft: 4, flexGrow: 1 }}>
                                <Image
                                    source={this.props.descriptionIcon}
                                    style={{
                                        tintColor: descriptionColor,
                                    }}
                                />
                            </View>
                        )}
                        {this.props.description && (
                            <ZText
                                linkify={linkify}
                                style={{
                                    ...TextStyles.Body,
                                    marginLeft: this.props.descriptionIcon ? 7 : 15,
                                    textAlignVertical: 'center',
                                    color: descriptionColor
                                }}
                                text={this.props.description}
                            />
                        )}
                        {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined)) && (
                            <Switch
                                style={{ marginLeft: 15 }}
                                value={toggleValue}
                                tintColor={theme.border}
                                thumbTintColor={Platform.OS === 'android' ? (toggleValue ? theme.accentPrimary : theme.backgroundTertiary) : undefined}
                                onTintColor={Platform.OS === 'android' ? theme.border : switchTintColor}
                                onValueChange={this.props.onToggle}
                                disabled={this.props.toggleDisabled !== null ? this.props.toggleDisabled : undefined}
                            />
                        )}
                        {showCheckmark && this.props.checkmarkType !== 'checkbox' && (
                            <View
                                style={[{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 11,
                                    borderWidth: checkmarkEnabled ? 7 : 2,
                                    borderColor: checkmarkEnabled ? theme.accentPrimary : theme.foregroundQuaternary,
                                }, this.props.checkmarkStyle && this.props.checkmarkStyle]}
                            />
                        )}
                        {showCheckmark && this.props.checkmarkType === 'checkbox' && (
                            <View
                                style={[{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 11,
                                    borderWidth: checkmarkEnabled ? 0 : 2,
                                    borderColor: theme.foregroundQuaternary,
                                    backgroundColor: checkmarkEnabled ? theme.accentPrimary : undefined,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, this.props.checkmarkStyle && this.props.checkmarkStyle]}
                            >
                                {checkmarkEnabled && (
                                    <Image
                                        source={require('assets/ic-checkmark-11.png')}
                                        style={{ tintColor: theme.foregroundInverted, marginRight: 1 }}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                    {this.props.subTitle && <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subTitle}</Text>}
                </View>
                {!!this.props.rightElement && <View style={{ paddingRight: 16, alignSelf: 'center' }}>{this.props.rightElement}</View>}
            </ZListItemBase >
        );
    }
}

export const ZListItem = React.memo<ZListItemProps>((props) => {
    const theme = React.useContext(ThemeContext);
    // const needStore = !!props.checkmarkField || !!props.toggleField;
    // if (needStore) {
    //     return (
    //         <XStoreContext.Consumer>
    //             {store => {
    //                 if (!store) {
    //                     throw Error('No store!');
    //                 }
    //                 return (<ZListItemComponent {...props} store={store} theme={theme} />);
    //             }}
    //         </XStoreContext.Consumer>
    //     );
    // }
    return <ZListItemComponent {...props} theme={theme} />;
});