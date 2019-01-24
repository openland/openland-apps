import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch, Image, Alert, Platform, Clipboard } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { ZText } from './ZText';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { XPStyles } from 'openland-xp/XPStyles';
import { ActionSheetBuilder } from './ActionSheet';

export interface ZListItemProps {
    leftAvatar?: { photo?: string | null, key: string, title: string };
    leftIcon?: any | null;
    leftIconColor?: string;
    separator?: boolean | null;
    title?: string | null;
    text?: string | null;
    description?: string;
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
    navigationIcon?: boolean;
    linkify?: boolean;
    copy?: boolean;
}

function LeftIcon(props: { src: any, appearance?: 'default' | 'action' | 'danger', leftIconColor?: string }) {
    if (Platform.OS === 'ios') {
        return (
            <View style={{ width: 42, height: 42, borderRadius: 21, alignContent: 'center', justifyContent: 'center', backgroundColor: props.leftIconColor || (props.appearance === 'danger' ? '#f6564e' : '#0184fe'), marginLeft: 16, alignSelf: 'center' }}>
                <Image source={props.src} style={{ width: 24, height: 24, alignSelf: 'center', tintColor: '#fff' }} />
            </View>
        );
    }
    return (
        <Image source={props.src} style={{ tintColor: props.appearance === 'danger' ? '#f6564e' : undefined, width: 24, height: 24, marginRight: 7, marginLeft: 23, alignSelf: 'center' }} />
    );
}

class ZListItemComponent extends React.PureComponent<ZListItemProps & { store?: XStoreState }> {

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
            new ActionSheetBuilder()
                .action('Copy', () => Clipboard.setString(this.props.text!))
                .show();
        }
    }

    render() {
        let showCheckmark = (this.props.checkmark !== undefined && this.props.checkmark !== null) || (!!this.props.checkmarkField);
        let checkmarkEnabled = !!this.props.checkmark;
        if (this.props.checkmarkField) {
            checkmarkEnabled = this.props.store!!.readValue('fields.' + this.props.checkmarkField.key) === this.props.checkmarkField.value;
        }

        let toggleValue: boolean | undefined = this.props.toggle ? this.props.toggle : undefined;
        if (this.props.toggleField) {
            toggleValue = this.props.store!!.readValue('fields.' + this.props.toggleField.key);
        }

        let enabled = !!this.props.copy || !!this.props.onPress || !!this.props.onLongPress || !!this.props.path || ((!!this.props.checkmarkField) && !checkmarkEnabled) || !!this.props.toggleField;

        return (
            <ZListItemBase
                onPress={this.handleOnPress}
                onLongPress={this.handleOnLongPress}
                enabled={enabled}
                backgroundColor="#fff"
                separator={this.props.separator === true}
                path={this.props.path}
                pathParams={this.props.pathParams}
                pathRemove={this.props.pathRemove}
                height={this.props.multiline ? null : (this.props.title || this.props.leftAvatar ? 60 : (this.props.leftIcon ? 60 : (Platform.OS === 'android' ? 48 : 44)))}
                navigationIcon={this.props.navigationIcon}
            >
                {this.props.leftIcon && <LeftIcon src={this.props.leftIcon} leftIconColor={this.props.leftIconColor} appearance={this.props.appearance} />}
                {this.props.leftAvatar && <View paddingLeft={16} alignSelf="center"><XPAvatar size={40} placeholderKey={this.props.leftAvatar.key} placeholderTitle={this.props.leftAvatar.title} src={this.props.leftAvatar.photo} /></View>}
                <View paddingLeft={16} paddingRight={16} flexGrow={1} paddingVertical={this.props.title ? 6 : undefined} justifyContent={!this.props.title ? 'center' : undefined}>
                    {this.props.title && Platform.OS !== 'android' && <Text style={{ color: '#000', fontSize: 14, height: 22 }}>{this.props.title.toLocaleLowerCase()}</Text>}
                    <View flexDirection="row" alignItems="center" justifyContent="center">
                        <ZText
                            linkify={this.props.linkify === true || !this.props.onPress}
                            style={{
                                fontSize: Platform.OS === 'android' ? 16 : 17,
                                fontWeight: Platform.OS === 'android' ? '400' : '500',
                                color: this.props.appearance === 'action' ? AppStyles.primaryColor
                                    : this.props.appearance === 'danger' ? '#f6564e'
                                        : '#181818',
                                lineHeight: 22,
                                textAlignVertical: 'center',
                                flexGrow: 1,
                                flexBasis: 0,
                                alignSelf: !this.props.title || this.props.leftAvatar ? 'center' : 'flex-start'
                            }}
                            numberOfLines={this.props.multiline ? undefined : 1}
                            text={this.props.text}
                        />
                        {this.props.description && (
                            <ZText linkify={this.props.linkify === true || !this.props.onPress} style={{ lineHeight: 22, marginLeft: 15, fontSize: 17, textAlignVertical: 'center', color: Platform.OS === 'android' ? '#9B9B9B' : 'rgba(138, 138, 143, 0.7)' }} text={this.props.description} />
                        )}
                        {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined) || (this.props.toggleField)) && (
                            <Switch style={{ marginLeft: 15 }} value={toggleValue} onTintColor={Platform.OS === 'android' ? '#80C0FE' : '#0084fe'} tintColor="#ddd" thumbTintColor={Platform.OS === 'android' ? '#0084fe' : undefined} onValueChange={this.props.toggleField ? this.handleOnPress : this.props.onToggle} disabled={this.props.toggleDisabled !== null ? this.props.toggleDisabled : undefined} />
                        )}
                        {showCheckmark && (
                            <Image source={require('assets/ic-checkmark-cell.png')} style={{ tintColor: '#0084fe', opacity: checkmarkEnabled ? 1 : 0 }} />
                        )}
                    </View>
                    {this.props.title && Platform.OS === 'android' && <Text style={{ color: '#000', opacity: 0.4, fontSize: 14, height: 22 }}>{this.props.title}</Text>}
                </View>
            </ZListItemBase>
        );
    }
}

export class ZListItem extends React.PureComponent<ZListItemProps> {
    render() {
        let needStore = !!this.props.checkmarkField || !!this.props.toggleField;
        if (needStore) {
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            if (!store) {
                                throw Error('No store!');
                            }
                        }
                        return (<ZListItemComponent {...this.props} store={store} />);
                    }}
                </XStoreContext.Consumer>
            );
        }
        return <ZListItemComponent {...this.props} />;
    }
}