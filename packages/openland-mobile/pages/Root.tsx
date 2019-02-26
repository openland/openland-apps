import * as React from 'react';
import { SRouting } from 'react-native-s/SRouting';
import { Platform, Dimensions, View, LayoutChangeEvent, LayoutAnimation } from 'react-native';
import { SNavigationView, SNavigationViewStyle } from 'react-native-s/SNavigationView';
import { AppStyles } from '../styles/AppStyles';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { randomKey } from 'react-native-s/utils/randomKey';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';

export interface RootProps {
    routing: SRouting;
    padLayout?: boolean;
}

let isPad = !!(Platform.OS === 'ios' && (Platform as any).isPad);

class RootContainer extends React.PureComponent<RootProps & { theme: AppTheme }, { width: number, height: number, masterRouting?: SRouting, masterKey?: string }> {

    private isIPad = false;

    constructor(props: RootProps & { theme: AppTheme }) {
        super(props);
        this.state = {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
        };

        this.isIPad = isPad && this.props.padLayout !== false;

        if (this.isIPad) {
            this.props.routing.navigationManager.setPushHandler(this.handlePush);
        }
    }

    private handlePush = (route: string, params?: any) => {
        let man = new NavigationManager(this.props.routing.navigationManager.routes, route, params);
        this.setState({ masterRouting: new SRouting(man), masterKey: randomKey() });
        return true;
    }

    private handleLayoutChange = (e: LayoutChangeEvent) => {
        let w = Dimensions.get('screen').width;
        let h = Dimensions.get('screen').height;
        if (Platform.OS === 'ios') {
            if (this.state.width !== w || this.state.height !== h) {
                LayoutAnimation.configureNext({
                    duration: 250,
                    update: {
                        type: 'linear'
                    }
                });
            }
        }
        this.setState({ width: w, height: h });
    }

    render() {

        let bgColor = this.props.theme.backgroundColor;
        let textColor = this.props.theme.textColor;
        let blurType = this.props.theme.blurType;
        let accentColor = this.props.theme.accentColor;
        let style: Partial<SNavigationViewStyle> = {
            accentColor,
            backgroundColor: bgColor,
            textColor,
            blurType,
            isOpaque: Platform.OS === 'ios' && blurType !== 'dark' ? false : true,
            hairlineColor: this.props.theme.hairlineColor,
            keyboardAppearance: this.props.theme.keyboardAppearance
        };

        if (this.isIPad) {
            return (
                <View width="100%" height="100%" flexDirection="row" onLayout={this.handleLayoutChange}>
                    <SNavigationView
                        width={300}
                        height={this.state.height}
                        routing={this.props.routing}
                        navigationBarStyle={style}
                    />
                    <View height={'100%'} width={0.5} backgroundColor={AppStyles.separatorColor} />
                    <View width={this.state.width - 300} height={'100%'}>
                        {this.state.masterRouting && (
                            <SNavigationView
                                key={this.state.masterKey!!}
                                width={this.state.width - 300}
                                height={this.state.height}
                                routing={this.state.masterRouting}
                                navigationBarStyle={style}
                            />
                        )}
                    </View>
                </View>
            );
        }

        return (
            <View width="100%" height="100%" flexDirection="row" onLayout={this.handleLayoutChange}>
                <SNavigationView
                    width={this.state.width}
                    height={this.state.height}
                    routing={this.props.routing}
                    navigationBarStyle={style}
                />
                {Platform.OS === 'android' && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: SDevice.safeArea.bottom, backgroundColor: bgColor }} />}
            </View>
        );
    }
}

export const Root = React.memo<RootProps>((props) => {
    let theme = React.useContext(ThemeContext);
    return <RootContainer {...props} theme={theme} />;
});