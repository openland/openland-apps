import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch, Image } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

export interface ZListItemProps {
    leftIcon?: any | null;
    separator?: boolean | null;
    title?: string | null;
    text?: string | null;
    description?: string;
    toggle?: boolean | null;
    toggleDisabled?: boolean | null;
    onToggle?: (value: boolean) => void;
    path?: string;
    onPress?: () => void;
    appearance?: 'default' | 'action';
    multiline?: boolean;
}

export class ZListItem extends React.PureComponent<ZListItemProps> {
    render() {
        return (
            <ZListItemBase onPress={this.props.onPress} backgroundColor="#fff" separator={this.props.separator === true} path={this.props.path} height={this.props.multiline ? null : (this.props.title ? 66 : 44)}>
                <View paddingLeft={15} paddingRight={15} flexGrow={1} paddingVertical={this.props.title ? 8 : 11}>
                    {this.props.title && <Text style={{ color: '#000', opacity: 0.8, fontSize: 14, height: 22 }}>{this.props.title}</Text>}
                    <View flexDirection="row" alignItems="center">
                        {this.props.leftIcon && <Image source={this.props.leftIcon} />}
                        <Text style={{ fontSize: 16, color: this.props.appearance === 'action' ? AppStyles.primaryColor : '#181818', lineHeight: 22, textAlignVertical: 'center', flexGrow: 1, flexBasis: 0 }} numberOfLines={this.props.multiline ? undefined : 1}>
                            {this.props.text}
                        </Text>
                        {this.props.description && (
                            <Text style={{ lineHeight: 22, marginLeft: 15, fontSize: 17, textAlignVertical: 'center', color: '#000' }}>
                                {this.props.description}
                            </Text>
                        )}
                        {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined)) && (
                            <Switch style={{ marginLeft: 15 }} value={this.props.toggle ? this.props.toggle : undefined} onValueChange={this.props.onToggle} disabled={this.props.toggleDisabled !== null ? this.props.toggleDisabled : undefined} />
                        )}
                    </View>
                </View>
            </ZListItemBase>
        );
    }
}