import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, Switch } from 'react-native';

export interface ZListItemProps {
    separator?: boolean;
    text?: string;
    description?: string;
    toggle?: boolean;
    toggleDisabled?: boolean;
    onToggle?: (value: boolean) => void;
    path?: string;
    onPress?: () => void;
}

export class ZListItem extends React.PureComponent<ZListItemProps> {
    render() {
        return (
            <ZListItemBase onPress={this.props.onPress} backgroundColor="#fff" separator={this.props.separator === true} path={this.props.path}>
                <View flexDirection="row" paddingLeft={15} paddingRight={15} flexGrow={1} alignItems="center">
                    <Text style={{ fontSize: 16, color: '#181818', lineHeight: 44, textAlignVertical: 'center', flexGrow: 1, flexBasis: 0 }}>
                        {this.props.text}
                    </Text>
                    {this.props.description && (
                        <Text style={{ lineHeight: 44, marginLeft: 15, fontSize: 16, textAlignVertical: 'center', color: '#aaaaaa' }}>
                            {this.props.description}
                        </Text>
                    )}
                    {((this.props.onToggle !== undefined) || (this.props.toggle !== undefined) || (this.props.toggleDisabled !== undefined)) && (
                        <Switch style={{ marginLeft: 15 }} value={this.props.toggle} onValueChange={this.props.onToggle} disabled={this.props.toggleDisabled} />
                    )}
                </View>
            </ZListItemBase>
        );
    }
}