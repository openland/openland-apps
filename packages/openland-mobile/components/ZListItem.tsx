import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch, Image } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { ZText } from './ZText';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XPAvatar } from 'openland-xp/XPAvatar';

export interface ZListItemProps {
    leftAvatar?: { photo?: string | null, key: string, title: string };
    leftIcon?: any | null;
    separator?: boolean | null;
    title?: string | null;
    text?: string | null;
    description?: string;
    toggle?: boolean | null;
    toggleDisabled?: boolean | null;
    checkmark?: boolean | null;
    checkmarkField?: { key: string, value: string };
    onToggle?: (value: boolean) => void;
    path?: string;
    onPress?: () => void;
    appearance?: 'default' | 'action';
    multiline?: boolean;
}

class ZListItemComponent extends React.PureComponent<ZListItemProps & { store?: XStoreState }> {

    handleOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.checkmarkField) {
            this.props.store!!.writeValue('fields.' + this.props.checkmarkField.key, this.props.checkmarkField.value);
        }
    }

    render() {
        let showCheckmark = (this.props.checkmark !== undefined && this.props.checkmark !== null) || (!!this.props.checkmarkField);
        let checkmarkEnabled = !!this.props.checkmark;
        if (this.props.checkmarkField) {
            checkmarkEnabled = this.props.store!!.readValue('fields.' + this.props.checkmarkField.key) === this.props.checkmarkField.value;
        }

        let enabled = !!this.props.onPress || !!this.props.path || ((!!this.props.checkmarkField) && !checkmarkEnabled);

        return (
            <ZListItemBase onPress={this.handleOnPress} enabled={enabled} backgroundColor="#fff" separator={this.props.separator === true} path={this.props.path} height={this.props.multiline ? null : (this.props.title ? 66 : 44)}>
                <View paddingLeft={15} paddingRight={15} flexGrow={1} paddingVertical={this.props.title ? 8 : 11}>
                    {this.props.title && <Text style={{ color: '#000', opacity: 0.8, fontSize: 14, height: 22 }}>{this.props.title}</Text>}
                    <View flexDirection="row" alignItems="center">
                        {this.props.leftIcon && <Image source={this.props.leftIcon} />}
                        {this.props.leftAvatar && <View paddingRight={8}><XPAvatar size={24} placeholderKey={this.props.leftAvatar.key} placeholderTitle={this.props.leftAvatar.title} src={this.props.leftAvatar.photo} /></View>}
                        <ZText style={{ fontSize: 16, color: this.props.appearance === 'action' ? AppStyles.primaryColor : '#181818', lineHeight: 22, textAlignVertical: 'center', flexGrow: 1, flexBasis: 0 }} numberOfLines={this.props.multiline ? undefined : 1} text={this.props.text} />
                        {this.props.description && (
                            <ZText style={{ lineHeight: 22, marginLeft: 15, fontSize: 17, textAlignVertical: 'center', color: 'rgba(138, 138, 143, 0.7)' }} text={this.props.description} />
                        )}
                        {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined)) && (
                            <Switch style={{ marginLeft: 15 }} value={this.props.toggle ? this.props.toggle : undefined} onValueChange={this.props.onToggle} disabled={this.props.toggleDisabled !== null ? this.props.toggleDisabled : undefined} />
                        )}
                        {showCheckmark && (
                            <Image source={require('assets/ic-checkmark-cell.png')} style={{ width: 20, height: 20, opacity: checkmarkEnabled ? 1 : 0 }} resizeMode="center" />
                        )}
                    </View>
                </View>
            </ZListItemBase>
        );
    }
}

export class ZListItem extends React.PureComponent<ZListItemProps> {
    render() {
        let needStore = !!this.props.checkmarkField;
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