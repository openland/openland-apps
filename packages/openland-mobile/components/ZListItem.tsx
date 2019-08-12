import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch, Image, Platform, Clipboard } from 'react-native';
import { ZText } from './ZText';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import ActionSheet from './ActionSheet';
import { ZAvatar } from './ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export interface ZListItemProps {
    leftAvatar?: { photo?: string | null, key: string, title: string };
    rightAvatar?: { photo?: string | null, key: string, title: string };
    leftIcon?: any | null;
    leftIconColor?: string;
    separator?: boolean | null;
    title?: string | null;
    subTitle?: string | any | null;
    text?: string | null;
    description?: string;
    descriptionColor?: string;
    descriptionIcon?: any;
    toggle?: boolean | null;
    toggleField?: { key: string };
    toggleDisabled?: boolean | null;
    checkmark?: boolean | null;
    checkmarkField?: { key: string, value: string };
    onToggle?: (value: boolean) => void;
    path?: string;
    pathParams?: any;
    pathRemove?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    appearance?: 'default' | 'action' | 'danger';
    multiline?: boolean;
    linkify?: boolean;
    copy?: boolean;
    small?: boolean;
}

const LeftIcon = (props: { theme: ThemeGlobal, src: any, flatIcon?: boolean, appearance?: 'default' | 'action' | 'danger', leftIconColor?: string }) => {
    const { theme, src, flatIcon, appearance, leftIconColor } = props;

    if (flatIcon) {
        return (
            <View style={{ width: 24, height: 24, alignContent: 'center', justifyContent: 'center', marginLeft: 16, alignSelf: 'center' }}>
                <Image source={src} resizeMode="contain" style={{ width: 24, height: 24, alignSelf: 'center', tintColor: theme.foregroundSecondary }} />
            </View>
        );
    }

    return (
        <View style={{ width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center', backgroundColor: leftIconColor || (appearance === 'danger' ? theme.accentNegative : theme.tintBlue), marginLeft: 16, alignSelf: 'center' }}>
            <Image source={src} resizeMode="contain" style={{ width: 24, height: 24, alignSelf: 'center', tintColor: theme.foregroundContrast }} />
        </View>
    );
};

class ZListItemComponent extends React.PureComponent<ZListItemProps & { store?: XStoreState, theme: ThemeGlobal }> {
    handleOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.checkmarkField) {
            this.props.store!!.writeValue('fields.' + this.props.checkmarkField.key, this.props.checkmarkField.value);
        }

        if (this.props.toggleField) {
            let current = this.props.store!!.readValue('fields.' + this.props.toggleField.key);
            this.props.store!!.writeValue('fields.' + this.props.toggleField.key, !current);
        }
    }

    handleOnLongPress = () => {
        if (this.props.onLongPress) {
            this.props.onLongPress();
        }
        if (this.props.copy && this.props.text) {
            ActionSheet.builder()
                .action('Copy', () => Clipboard.setString(this.props.text!))
                .show();
        }
    }

    render() {
        const { theme } = this.props;

        const showCheckmark = (this.props.checkmark !== undefined && this.props.checkmark !== null) || (!!this.props.checkmarkField);
        let checkmarkEnabled = !!this.props.checkmark;
        if (this.props.checkmarkField) {
            checkmarkEnabled = this.props.store!!.readValue('fields.' + this.props.checkmarkField.key) === this.props.checkmarkField.value;
        }

        let toggleValue: boolean | undefined = this.props.toggle ? this.props.toggle : undefined;
        if (this.props.toggleField) {
            toggleValue = this.props.store!!.readValue('fields.' + this.props.toggleField.key);
        }

        const enabled = !!this.props.copy || !!this.props.onPress || !!this.props.onLongPress || !!this.props.path || ((!!this.props.checkmarkField) && !checkmarkEnabled) || !!this.props.toggleField;
        const linkify = (this.props.linkify === true || (this.props.linkify === undefined && !this.props.onPress && !this.props.path));
        const descriptionColor = this.props.descriptionColor ? this.props.descriptionColor : theme.foregroundTertiary;
        const isBig = this.props.subTitle || this.props.leftAvatar || this.props.leftIconColor || (this.props.leftIcon && !this.props.small);
        const height = this.props.multiline ? null : ((isBig) ? 56 : 48);

        return (
            <ZListItemBase
                onPress={this.handleOnPress}
                onLongPress={this.handleOnLongPress}
                enabled={enabled}
                separator={this.props.separator === true}
                path={this.props.path}
                pathParams={this.props.pathParams}
                pathRemove={this.props.pathRemove}
                height={height}
            >
                {this.props.leftIcon && <LeftIcon theme={theme} src={this.props.leftIcon} flatIcon={this.props.small} leftIconColor={this.props.leftIconColor} appearance={this.props.appearance} />}
                {this.props.leftAvatar && <View paddingLeft={16} alignSelf="center"><ZAvatar size="medium" placeholderKey={this.props.leftAvatar.key} placeholderTitle={this.props.leftAvatar.title} src={this.props.leftAvatar.photo} /></View>}
                <View paddingHorizontal={16} paddingVertical={this.props.multiline ? 3 : undefined} flexGrow={1} flex={1} justifyContent="center">
                    {this.props.title && <Text style={{ ...TextStyles.Caption, color: theme.foregroundSecondary, marginTop: 2, marginBottom: -2 }} allowFontScaling={false}>{this.props.title.toLocaleLowerCase()}</Text>}
                    <View flexDirection="row" alignItems="center" justifyContent="center">
                        <ZText
                            linkify={linkify}
                            style={{
                                ...((!isBig || this.props.small) ? TextStyles.Body : TextStyles.Label1),
                                color: this.props.appearance === 'action' ? theme.accentPrimary
                                    : this.props.appearance === 'danger' ? theme.accentNegative
                                        : theme.foregroundPrimary,
                                textAlignVertical: 'center',
                                flexGrow: 1,
                                flexBasis: 0,
                                alignSelf: !this.props.title || this.props.leftAvatar ? 'center' : 'flex-start'
                            }}
                            numberOfLines={this.props.multiline ? undefined : 1}
                            text={this.props.text}
                        />
                        {this.props.descriptionIcon && (
                            <Image
                                source={this.props.descriptionIcon}
                                style={{
                                    tintColor: descriptionColor,
                                    marginLeft: 15
                                }}
                            />
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
                        {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined) || (this.props.toggleField)) && (
                            <Switch style={{ marginLeft: 15 }} value={toggleValue} onTintColor={Platform.OS === 'android' ? '#80C0FE' : '#0084fe'} tintColor="#ddd" thumbTintColor={Platform.OS === 'android' ? '#0084fe' : undefined} onValueChange={this.props.toggleField ? this.handleOnPress : this.props.onToggle} disabled={this.props.toggleDisabled !== null ? this.props.toggleDisabled : undefined} />
                        )}
                        {showCheckmark && (
                            <View
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 11,
                                    borderWidth: checkmarkEnabled ? 7 : 2,
                                    borderColor: checkmarkEnabled ? theme.accentPrimary : theme.foregroundQuaternary,
                                }}
                            />
                        )}
                    </View>
                    {this.props.subTitle && <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subTitle}</Text>}
                </View>
                {this.props.rightAvatar && <View paddingRight={16} alignSelf="center"><ZAvatar size="medium" placeholderKey={this.props.rightAvatar.key} placeholderTitle={this.props.rightAvatar.title} src={this.props.rightAvatar.photo} /></View>}
            </ZListItemBase >
        );
    }
}

export const ZListItem = React.memo<ZListItemProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let needStore = !!props.checkmarkField || !!props.toggleField;
    if (needStore) {
        return (
            <XStoreContext.Consumer>
                {store => {
                    if (!store) {
                        throw Error('No store!');
                    }
                    return (<ZListItemComponent {...props} store={store} theme={theme} />);
                }}
            </XStoreContext.Consumer>
        );
    }
    return <ZListItemComponent {...props} theme={theme} />;
});