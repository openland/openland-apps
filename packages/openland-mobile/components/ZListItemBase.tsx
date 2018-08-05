import * as React from 'react';
import { TouchableHighlight, View, Image } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { isAndroid } from '../utils/isAndroid';

export interface ZListItemBaseProps {
    separatorPaddingStart?: number;
    separator?: boolean;
    height?: number | null;
    onPress?: () => void;
    path?: string;
    navigationIcon?: boolean;
    backgroundColor?: string;
}

class ZListItemBaseImpl extends React.PureComponent<ZListItemBaseProps & NavigationInjectedProps> {

    handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            this.props.navigation.navigate(this.props.path);
        }
    }

    render() {
        let height = this.props.height === null ? undefined : (this.props.height ? this.props.height : 44);
        return (
            <TouchableHighlight onPress={this.handlePress} underlayColor="#f8f8fb" style={{ backgroundColor: this.props.backgroundColor }} disabled={!this.props.onPress && !this.props.path} delayPressIn={0}>
                <View style={{ height: height ? (height + (this.props.separator !== false ? 1 : 0)) : undefined, flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
                    <View style={{ height: height, flexDirection: 'row' }}>
                        <View flexBasis={0} flexGrow={1} flexDirection="row" height={height}>{this.props.children}</View>
                        {!isAndroid && this.props.path && (
                            <Image source={require('assets/ic-arrow-cell.png')} alignSelf="center" marginRight={15} />
                        )}
                    </View>
                    {this.props.separator !== false && <View style={{ backgroundColor: AppStyles.separatorColor, height: 1, marginLeft: this.props.separatorPaddingStart }} />}
                </View>
            </TouchableHighlight>
        );
    }
}

export const ZListItemBase = withNavigation(ZListItemBaseImpl);