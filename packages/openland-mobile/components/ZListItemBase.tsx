import * as React from 'react';
import { View, Image, TouchableHighlight, Alert } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { isAndroid } from '../utils/isAndroid';
import { RectButton } from 'react-native-gesture-handler';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';

export interface ZListItemBaseProps {
    separatorPaddingStart?: number;
    separator?: boolean;
    height?: number | null;
    onPress?: () => void;
    onLongPress?: () => void;
    path?: string;
    navigationIcon?: boolean;
    backgroundColor?: string;
    enabled?: boolean;
}

class ZListItemBaseImpl extends React.PureComponent<ZListItemBaseProps & { router: SRouter }> {

    handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            this.props.router.push(this.props.path);
        }
    }

    handleLongPress = () => {
        if (this.props.onLongPress) {
            this.props.onLongPress();
        }
    }

    render() {
        let height = this.props.height === null ? undefined : (this.props.height ? this.props.height : 44);

        const content = (
            <View style={{ height: height ? (height + (this.props.separator !== false ? 1 : 0)) : undefined, flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
                <View style={{ height: height, flexDirection: 'row' }}>
                    <View flexBasis={0} flexGrow={1} flexDirection="row" height={height}>{this.props.children}</View>
                    {(!isAndroid && this.props.path || this.props.navigationIcon) && (
                        <Image source={require('assets/ic-arrow-cell.png')} alignSelf="center" marginRight={15} />
                    )}
                </View>
                {this.props.separator !== false && <View style={{ backgroundColor: AppStyles.separatorColor, height: 1, marginLeft: this.props.separatorPaddingStart }} />}
            </View>
        );

        if (!!this.props.onPress || !!this.props.onLongPress || !!this.props.path) {
            return (this.props.enabled !== false ? (
                <TouchableHighlight underlayColor="#eee" onLongPress={this.handleLongPress} onPress={this.handlePress} style={{ backgroundColor: this.props.backgroundColor }}>
                    {content}
                </TouchableHighlight>
            ) : (
                    <RectButton enabled={this.props.enabled} onPress={this.handlePress} style={{ backgroundColor: this.props.backgroundColor }}>
                        {content}
                    </RectButton>
                )
            );
        } else {
            return (
                <View style={{ backgroundColor: this.props.backgroundColor }}>
                    {content}
                </View>
            );
        }
    }
}

export const ZListItemBase = withRouter(ZListItemBaseImpl);